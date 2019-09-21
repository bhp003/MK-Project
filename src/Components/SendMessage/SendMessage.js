import React from 'react';
import {TextField, Button } from '@material-ui/core';
import './SendMessage.css';

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
      message: ''
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
    const xhr = new XMLHttpRequest();
    const APIGATEWAY_KEY = process.env.REACT_APP_APIGATEWAY_KEY;
    xhr.open("POST", APIGATEWAY_KEY);
    xhr.send(JSON.stringify(data));
  }

  render() {
    const {user} = this.state;
    const {errorMessages} = this.state;
    return(
      <div className="SendMessage">
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
      </div>
    );
  }
}

export default SendMessage;