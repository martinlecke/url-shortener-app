import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    inputUrl: ''
  };
  componentDidMount() {
    this.apiTest();
  }
  apiTest = async () => {
    const response = await fetch('/test');
    const body = await response.json();

    console.log(body);
  };

  handleInputUrl = (e) => {
    this.setState({ inputUrl: e.target.value})
  };

  handleSubmitShorten = (e) => {
    e.preventDefault();
    console.log('submitted')
    this.setState({ inputUrl: '' })
  }

  render() {
    const { inputUrl } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Url Shortener</h1>
          <form onSubmit={this.handleSubmitShorten}>
            <input
              type="text"
              value={inputUrl}
              onChange={this.handleInputUrl}
            />
            <button>
              Shorten
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
