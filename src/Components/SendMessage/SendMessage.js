import React from 'react';
import {TextField, Button} from '@material-ui/core';
import './SendMessage.css';

const STATUS_CODES = {
  OK: 200, 
  ERR: 500
}

class MessageData {
  constructor(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
  }
}

class SendMessage extends React.Component {
  state = {
    user: {
      name: '',
      email: '',
      message: '',
      notification: {
        message: '',
        color: '',
        isVisible: false
      }
    },
    errorMessages: {
      name: '',
      email: ''
    }
  }

  handleNameError = (name) => {
    const {errorMessages} = this.state
    // names only letter and spaces
    if (name && !/^[a-zA-Z ]+$/.test(name)) {
      errorMessages.name = "Name can only be letters!";
      this.setState({errorMessages});
    }
    else {
      errorMessages.name = "";
      this.setState(this.state.errorMessages);
    }
  }

  handleEmailError = (email) => {
    const {errorMessages} = this.state
    // correct email format
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errorMessages.email = "Wrong email format!";
      this.setState(errorMessages);
    }
    else {
      errorMessages.email = "";
      this.setState({errorMessages});
    }
  }

  onNameChange = (event) => {
    event.preventDefault();
    const {user} = this.state;
    user.name = event.target.value;
    this.setState({user});
    this.handleNameError(user.name);
  }

  onEmailChange = (event) => {
    event.preventDefault();
    const {user} = this.state;
    user.email = event.target.value;
    this.setState({user});
    this.handleEmailError(user.email);
  }

  onMessageChange = (event) => {
    event.preventDefault();
    const {user} = this.state;
    user.message = event.target.value;
    this.setState({user});
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {user} = this.state;
    const data = new MessageData(user.name, user.email, user.message);
    this.sendSaveMessageRequest(data);
    this.sendSendEmailRequest(data);
  }

  sendSaveMessageRequest = (data) => {
    const xhrSaveMessage = new XMLHttpRequest();
    const SAVE_MESSAGE_API_KEY = process.env.REACT_APP_APIGATEWAY_SAVE_MESSAGE_KEY;
    xhrSaveMessage.open("POST", SAVE_MESSAGE_API_KEY);
    xhrSaveMessage.send(JSON.stringify(data));
  }

  sendSendEmailRequest = (data) => {
    const xhrSendEmail = new XMLHttpRequest();   
    const SEND_EMAIL_API_KEY = process.env.REACT_APP_APIGATEWAY_SEND_EMAIL_KEY;

    xhrSendEmail.onreadystatechange = () => {
      if (xhrSendEmail.readyState === XMLHttpRequest.DONE) {
        const {user} = this.state;
        const response = JSON.parse(xhrSendEmail.response);
        if (response.statusCode === STATUS_CODES.OK) {
          user.notification.message = response.body;
          user.notification.color = "#64dd17";
        }
        else {
          user.notification.message = response.body;
          user.notification.color = "#e53935";
        }
        user.notification.isVisible = true;
        this.setState({user});
        setTimeout(() => {
          user.notification.isVisible = false;
          this.setState({user});
        }, 3000);
      }
    }

    xhrSendEmail.open("POST", SEND_EMAIL_API_KEY);
    xhrSendEmail.send(JSON.stringify(data));
  }

  render() {
    const {user} = this.state;
    const {errorMessages} = this.state;
    return(
      <div>
        <form className="SendMessage-form" onSubmit={this.onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Name"      
            name="name"
            type="text"
            fullWidth
            required
            value={user.name}
            onChange={this.onNameChange}
          />
          <div className="SendMessage-errorMessage">
            {errorMessages.name}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={user.email}
            onChange={this.onEmailChange}
          />
          <div className="SendMessage-errorMessage">
            {errorMessages.email}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            label="Message"
            name="message"
            type="text"
            multiline
            fullWidth
            rows="8"
            value={user.message}
            onChange={this.onMessageChange}
          />
          <Button
            className="SendMessage-button"
            color="primary"
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </form>
        { this.state.user.notification.isVisible ? <div 
          className="SendMessage-popup" 
          style={{"background" : this.state.user.notification.color}}>
            <p>{this.state.user.notification.message}</p>
        </div> 
        : null }
      </div>
    );
  }
}

export default SendMessage;