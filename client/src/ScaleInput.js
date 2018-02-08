import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";

const ScaleInput = ({ value, incScale, decScale }) => (
  <Segment>
    <Header as="h2" floated="left">
      scale: {value}
    </Header>
    <Button onClick={incScale}> + </Button>
    <Button onClick={decScale}> - </Button>
  </Segment>
);

export default ScaleInput;
