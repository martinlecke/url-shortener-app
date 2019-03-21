import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.apiTest();
  }
  apiTest = async () => {
    const response = await fetch('/test');
    const body = await response.json();

    console.log(body)
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test</h1>
        </header>
      </div>
    );
  }
}

export default App;
