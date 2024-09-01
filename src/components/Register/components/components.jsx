import React from "react";
import axios from "axios";
import styles from './Register.module.scss'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", email: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await axios.post("http://localhost:3000/users/", {
      login: this.state.login,
      email: this.state.email,
      password: this.state.password,
    });

    console.log(res.data)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Логин:
          <input
            type="text"
            name="login"
            value={this.state.login}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

export default Form;
