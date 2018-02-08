import React from "react";
import { Segment } from "semantic-ui-react";

const WordInfo = ({ selectedWord }) => (
  <Segment>
    {selectedWord ? (
      <span>
        <i> {selectedWord.text} </i> appeared {selectedWord.value} times
      </span>
    ) : (
      "select a word"
    )}
  </Segment>
);

export default WordInfo;
