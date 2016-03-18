var commonModal = require('client/components/modal_common/index');
var config = require('./config.json');
var request = require('../../request');

function pop(obj, callback, parent) {

  request.getOverview().then((overview) => {
    var capacity = overview.overview_usage['gigabytes_' + obj.volume_type];
    if (capacity.total < 0) {
      capacity.total = overview.overview_usage.gigabytes.total;
    }

    var props = {
      parent: parent,
      config: config,
      onInitialize: function(refs) {
        refs.capacity_size.setState({
          min: obj.size,
          max: capacity.total - capacity.used,
          value: obj.size
        });
      },
      onConfirm: function(refs, cb) {
        var data = {};
        data.new_size = Number(refs.capacity_size.state.value);

        request.extendVolumeSize(obj, data).then((res) => {
          callback(res);
          cb(true);
        });
      },
      onAction: function(field, state, refs) {
        switch (field) {
          case 'performance_size':
            if (state.value < 100) {
              refs.iops.setState({
                value: config.fields[3].min
              });
              refs.throughput.setState({
                value: config.fields[4].min
              });
            } else {
              refs.iops.setState({
                value: config.fields[3].min + Math.floor((state.value - 100) / 10) * 50
              });
              refs.throughput.setState({
                value: config.fields[4].min + Math.floor((state.value - 100) / 10)
              });
            }
            break;
          default:
            break;
        }
      }
    };

    commonModal(props);

  });

}

module.exports = pop;
