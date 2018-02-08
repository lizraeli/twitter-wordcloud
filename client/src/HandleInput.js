import React from "react";

class HandleInput extends React.Component {
  state = {
    handleInput: ""
  };

  handleChange = e => {
    this.setState({ handleInput: e.target.value });
  };

  submitHandle = e => {
    e.preventDefault();
    this.props.submitHandle(this.state.handleInput);
    this.setState({
      handleInput: ""
    });
  };

  render() {
    const { handleInput } = this.state;
    return (
      <form onSubmit={this.submitHandle}>
        <input type="text" value={handleInput} onChange={this.handleChange} />{" "}
        <button type="submit"> submit </button>
      </form>
    );
  }
}

export default HandleInput;
