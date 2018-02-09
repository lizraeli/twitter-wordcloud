import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";

const ZoomInput = ({ value, incScale, decScale }) => (
  <Segment>
    <Header as="h2" floated="left">
      Zoom: {value}
    </Header>
    <Button onClick={incScale} disabled={value >= 10}>
      +
    </Button>
    <Button onClick={decScale} disabled={value <= 1}>
      -
    </Button>
  </Segment>
);

export default ZoomInput;
