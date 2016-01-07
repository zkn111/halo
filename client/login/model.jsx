var React = require('react');
var request = require('../libs/request');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginError: false
    };

    this.doSubmit = this.doSubmit.bind(this);
  }

  doSubmit(e) {
    e.preventDefault();

    var refs = this.refs,
      that = this;

    request.post({
      url: '/auth/login',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        username: refs.username.value,
        password: refs.pwd.value
      }
    }).then(function(data) {
      window.location = '/';
    }, function(err) {
      that.setState({
        loginError: true
      });
    });

  }

  render() {
    var props = this.props,
      state = this.state;

    return (
      <form method="POST" onSubmit={this.doSubmit}>
        <input type="text" ref="username" placeholder={props.accountPlaceholder} autoFocus="autofocus" autoComplete="off" />
        <input type="password" ref="pwd" placeholder={props.pwdPlaceholder} autoComplete="off" />
        <div className="tip-wrapper">
          <div className={'input-error' + (state.loginError ? '' : ' hide')}>
            <i className="glyphicon icon-status-warning"></i><span>{props.errorTip}</span>
          </div>
        </div>
        <input type="submit" value={props.submit} />
      </form>
    );
  }
}

module.exports = Model;