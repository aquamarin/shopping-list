import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      input: "",
    };
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  addShoppingList = () => {
    const Items = {
      value: this.state.input,
    };

    const newList = JSON.parse(localStorage.getItem("list"));
    newList.push(Items);
    localStorage.setItem("list", JSON.stringify(newList));

    this.setState({
      list: JSON.parse(localStorage.getItem("list")),
      input: "",
    });
  };

  componentDidMount() {
    const list = window.localStorage.getItem("list");
    const parsedList = JSON.parse(list);
    if (list == null) {
      return false;
    } else {
      this.setState({
        list: parsedList,
      });
    }
  }

  deleteItem = (event) => {
    let index = event.target.getAttribute("data-key");
    let listValue = JSON.parse(localStorage.getItem("list"));
    listValue.splice(index, 1);
    this.setState({ list: listValue });
    localStorage.setItem("list", JSON.stringify(listValue));
  };

  render() {
    return (
      <div className="container">
        <h1>Shopping List</h1>
        <main>
          <input
            type="text"
            placeholder="Alışveriş Listesine Ekle"
            value={this.state.input}
            onChange={this.handleChange}
          ></input>
          <button onClick={this.addShoppingList}>Add</button>
          <ul>
            {this.state.list.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    type="button"
                    value="delete"
                    data-key={index}
                    onClick={this.deleteItem}
                  >
                    X
                  </button>
                  {item.value}
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
