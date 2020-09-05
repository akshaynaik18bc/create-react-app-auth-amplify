import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth,API } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {  
constructor(props) {
        super(props);
        this.state = {
            leave: []
        }
        Amplify.configure({
            API: {
              endpoints: [
                  {
                      name: "ann",
                      endpoint: "https://8wp9s1k2ed.execute-api.us-east-1.amazonaws.com/prod"
                  }
              ]
            }
        });
    }
 
    handleSubmit = async event =>{
        const apiName = 'ann';
        const path = '/location';
        const myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
            // response: true
        };
        API.get(apiName, path, myInit).then(response => {
            this.setState({ leave: response });
            console.log(response);
        }).catch(error => {
            console.log(error.response)
        });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <input type="submit" name='sos' value="Send SOS"/>
        </form>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
