import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import picture from './images/josh.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJoshDay: false,
      message: '',
    }
    this.today = new Date();
    this.offset = -this.today.getTimezoneOffset() / 60;
    this.today = new Date(Date.parse(this.today) + (this.offset * 3.6e6));
    this.josh = new Date(this.today.getFullYear().toString() + '-04-04');
    this.josh = new Date(Date.parse(this.josh) + (this.offset * 3.6e6));
    this.checkTime();
    this.updateMessage();
  }

  checkTime = () => {
    this.today = new Date();
    this.today = new Date(Date.parse(this.today) + (this.offset * 3.6e6));
    if (this.today.getMonth() < 3) {
      this.josh = new Date(this.today.getFullYear().toString() + '-04-04');
    } else if (this.today.getMonth() ===3) {
      if (this.today.getDate() < 4) {
        this.josh = new Date(this.today.getFullYear().toString() + '-04-04');
      } else if (this.today.getDate() > 4) {
        this.josh = new Date((this.today.getFullYear() + 1).toString() + '-04-04');
      } else if (this.today.getDate() === 4) {
        this.josh = new Date();
        this.setState({ isJoshDay: true });
      }
    } else if (this.today.getMonth() > 3) {
      this.josh = new Date((this.today.getFullYear() + 1).toString() + '-04-04');
    }
    this.josh = new Date(Date.parse(this.josh) + (this.offset * 3.6e6));
  }

  timeToJoshDay = () => {
    var t = this.josh - this.today;
    var d = Math.floor(t / 8.64e7);
    var h = Math.floor(t % 8.64e7 / 3.6e6);
    var m = Math.floor(t % 3.6e6 / 6e4);
    var s = Math.floor(t % 6e4 / 1e3);

    return (d.toString() + ' days, ' + h.toString() + ' hours, ' + m.toString() + ' minutes, and ' + s.toString() + ' seconds.');
  }

  updateMessage = () => {
    if (this.state.isJoshDay) {
      this.setState({ message: "IT'S INTERNATIONAL JOSH DAY! CELEBRATE!" });
    } else {
      this.setState({ message: this.timeToJoshDay() });
    }
  }

  componentDidMount() {
    window.setInterval(function() {
      this.checkTime();
      this.updateMessage();
    }.bind(this), 500);
  }

  render() {
    return (
      <Background>
        <Image src={picture} visible={this.state.isJoshDay} />
        {!this.state.isJoshDay &&
          <MainText>
            Time Until International Josh Day:
          </MainText>
        }
        <MainText>
          {this.state.message}
        </MainText>
      </Background>
    )
  }
}

export default App;

const Rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const Background = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #bbd4f2;
  text-align: center;
  flex-direction: column;
`;

const MainText = styled.h1`
  color: #424242;
  font-family: Open Sans;
  font-size: 42px;
  margin-bottom: -10px;
  z-index: 1;
`;

const Image = styled.img`
  display: ${props => (props.visible === true) ? 'inline-block' : 'none'};
  height: 50vh;
  animation: ${Rotate} 1s linear infinite;
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;