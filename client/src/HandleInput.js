import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

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
      <Segment>
        <Form onSubmit={this.submitHandle}>
          <Form.Field>
            <label>Handle</label>
            <input
              type="text"
              value={handleInput}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit"> submit </Button>
        </Form>
      </Segment>
    );
  }
}

export default HandleInput;
