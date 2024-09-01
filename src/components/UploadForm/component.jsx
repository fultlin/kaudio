import React from "react";
import axios from "axios";

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: "",
      author: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("name", this.state.name);
    formData.append("author", this.state.author);

    const res = await axios.post(
      "http://localhost:3000/music/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Автор:
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Файл:
          <input type="file" onChange={this.handleFileChange} />
        </label>
        <br />
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

export default UploadForm;
