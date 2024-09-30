import React, { Component } from "react";

class Airdrop extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 20 };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  // Start the timer manually when the user qualifies
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      // Simulate releasing tokens with a console log
      console.log("Airdrop would be released now!");
      // Reset the timer
      this.setState({ seconds: 20 });  // Reset to 20 seconds for the next airdrop
      this.timer = 0;  // Reset the timer
    }
  }

  // Convert seconds to time object (hours, minutes, seconds)
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let minutes = Math.floor((secs % (60 * 60)) / 60);
    let seconds = secs % 60;

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  }

  // Initialize the countdown when the component mounts
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  // Function to check staking balance and start timer if the user qualifies
  AirdropReleaseTokens() {
    let stakingB = this.props.stakingBalance;
    if (stakingB >= '50000000000000000000' && this.timer === 0) {  // Ensure timer isn't already running
      this.startTimer();
    }
  }

  render() {
    return (
      <div style={{ color: 'black' }}>
        {this.state.time.m}:{this.state.time.s}
        {/* Call AirdropReleaseTokens conditionally */}
        {this.AirdropReleaseTokens()}
      </div>
    );
  }
}

export default Airdrop;
