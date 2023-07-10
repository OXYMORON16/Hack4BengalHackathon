import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "",
      players: [],
      balance: "",
      value: "",
      message: "",
    };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const player = await lottery.methods.playersData().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({
      manager: manager,
      players: player,
      balance: balance,
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success ....." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({
      message: "Congratulations!!! You are in the pool!",
    });
  };

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: "Getting the winnnnnnerrrr",
    });
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({
      message: "The winner is decided! we will transfer the money to the winner",
    });
  };

  render() {
    const centerStyle = {
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "100vh",
      color: "white",
    };
  
    return (
      <div style={centerStyle}>
        <h2>BetPool</h2>
        {/* <p>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          SHM!!!
        </p> */}
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Get into the POOL now!</h4>
          <div>
            <label>SHM to bet in pool:</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Are you ready for the winner?</h4>
        <button onClick={this.onClick}>
           winner
        </button>
        <hr />
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default App;