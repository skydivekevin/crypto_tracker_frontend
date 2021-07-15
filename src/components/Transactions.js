import React, { Component } from 'react'
import axios from "axios";

export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      coin: "",
      costPerCoin: 0,
      totalCost: 0,
      totalCoin: 0
    };

    this.getTransactions = this.getTransactions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
  };

  componentDidMount(){
    this.getTransactions()
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  updateTransactions(transaction){
    this.setState((prevState) => {
      return {
        transactions: [
          ...prevState.transactions, transaction 
        ]
      }
    })
  };

  getTransactions(){
    axios.get("http://localhost:3001/transactions", { withCredentials: true})
    .then(response => {
      this.setState({
        transactions: response.data.transactions
      })
    })
  };

  addTransaction(event){
    event.preventDefault();
    const { coin, costPerCoin, totalCost, totalCoin } = this.state;
    const transaction = {coin: coin, cost_per_coin: costPerCoin, total_cost: totalCost, total_coin:totalCoin};
    axios.post('http://localhost:3001/transactions', transaction, { withCredentials: true})
    .then(res => {
      if (res.data.success) {
        console.log("inside addTransaction; successful add transaction")
        this.setState((prevState) => {
          return {
            transactions: [
              ...prevState.transactions, transaction 
            ]
          }
        })
      }
    })
  };

    renderTransactions(){
      console.log("hit renderTransactions: ", this.state.transactions)
      if(this.state.transactions){
        return (
          <ul>
            {this.state.transactions.map((transaction, index) => {
          return (<li key={index}>coin: {transaction.coin}</li>)
        })}
        </ul>
        )
      }
      else {
        return (
          <div>You have no transactions</div>
        )
      } 
    };

  render() {
    return (
      <div>
        <form onSubmit={this.addTransaction}>
          <input
            type="text"
            name="coin"
            placeholder="coin"
            value={this.state.coin}
            onChange={this.handleChange}
            required
          />

          <input
            type="number"
            name="costPerCoin"
            placeholder="Cost Per Coin"
            value={this.state.costPerCoin}
            onChange={this.handleChange}
          />

          <input
            type="number"
            name="totalCost"
            placeholder="Total Transaction cost"
            value={this.state.totalCost}
            onChange={this.handleChange}
          />

          <input
            type="number"
            name="totalCoin"
            placeholder="Total Coin Purchased"
            value={this.state.totalCoin}
            onChange={this.handleChange}
          />

          <button type="submit">Submit Purchase</button>
        </form>
        <ul>transactions: {this.renderTransactions()}</ul>
        {/* <ul>transactions: {this.state.transactions.map((transaction) => {
          return (<li>{transaction.coin}</li>)
        })}</ul> */}
      </div>
    );
  }
}




