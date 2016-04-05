var commonModal = require('client/components/modal_common/index');
var config = require('./config.json');
var request = require('../../request');
var getErrorMessage = require('client/applications/dashboard/utils/error_message');

function pop(obj, parent, callback) {
  config.fields[1].text = obj.name || '(' + obj.id.slice(0, 8) + ')';
  config.fields[2].text = obj.server.name;

  var props = {
    parent: parent,
    config: config,

    onInitialize: function(refs) {
    },
    onConfirm: function(refs, cb) {
      var serverId = obj.server.id,
        portId = obj.id;

      request.detchInstance(serverId, portId).then((res) => {
        callback && callback();
        cb(true);
      }).catch((error) => {
        cb(false, getErrorMessage(error));
      });
    },
    onAction: function(field, status, refs) {}
  };

  commonModal(props);
}

module.exports = pop;