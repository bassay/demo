import React from 'react';

export default class App extends React.Component {
  state = {
    count: 0,
    isCounting: false,
  };

  componentDidMount() {
    let userCount = +localStorage.getItem('timer');
    if (userCount) {
      this.setState({ count: userCount });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('timer', this.state.count);
  }

  componentWillUnmount() {
    clearInterval(this.counterId);
  }

  handleStart = () => {
    this.setState({ isCounting: true });
    this.counterId = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 10);
  };

  handleStop = () => {
    this.setState({ isCounting: false });
    clearInterval(this.counterId);
  };

  handleReset = () => {
    this.setState({ isCounting: false, count: 0 });
    clearInterval(this.counterId);
  };

  render() {
    return (
      <div
        className='App'
        style={{
          width: '300px',
          margin: '0 auto',
          border: '1px solid red',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        <h1>React Timer</h1>
        <h3>{this.state.count}</h3>
        {!this.state.isCounting ? (
          <button onClick={this.handleStart}>Start</button>
        ) : (
          <button onClick={this.handleStop}>Stop</button>
        )}
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}
