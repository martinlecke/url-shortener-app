import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    inputUrl: '',
    customUrlInput: '',
    newUrlMade: '',
    error: '',
    ownerUrls: []
  };

  componentDidMount() {
    fetch('/api/urls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          ownerUrls: data
        });
      });
  }

  handleInputUrl = e => {
    this.setState({ inputUrl: e.target.value });
  };

  handleSubmitShorten = e => {
    e.preventDefault();
    if (this.state.inputUrl.length < 3) {
      return;
    }
    this.setState({ inputUrl: '' });
    this.postShortenUrl();
  };

  postShortenUrl = async () => {
    const data = {
      urlToShorten: this.state.inputUrl.includes('http')
        ? this.state.inputUrl
        : `http://${this.state.inputUrl}`,
      customUrl: this.state.customUrlInput
    };

    const validUrlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
    if (data.urlToShorten.match(validUrlRegex)) {
      fetch('/api/shorten-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(response => {
          console.log(response);
          this.setState({ newUrlMade: response });
        })
        .catch(e => {
          this.setState({ error: 'Could not shorten your URL.' });
        });
    } else {
      this.setState({ error: 'Not valid URL.' });
    }
  };

  render() {
    const { inputUrl, newUrlMade, error, ownerUrls } = this.state;
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
            <button>Shorten</button>
          </form>
          {newUrlMade && (
            <p>
              <a href={`${newUrlMade.shortenUrl}`}>
                {`${newUrlMade.shortenUrl}`}
              </a>
            </p>
          )}
          {error && <p>{error}</p>}
          {ownerUrls &&
            ownerUrls.map(link => (
              <p>
                <a href={link.url}>{link.url}</a> - {link.visited}
              </p>
            ))}
        </header>
      </div>
    );
  }
}

export default App;
