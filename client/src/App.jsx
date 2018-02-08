import React, { Component } from "react";
import axios from "axios";
import { Container, Segment, Loader, Header } from "semantic-ui-react";

import stopWords from "./stopwords";
import HandleInput from "./HandleInput";
import ScaleInput from "./ScaleInput";
import WordCloud from "./WordCloud";
import WordInfo from "./WordInfo";

import { makeWordMap, wordMapToPairs } from "./utils";

class App extends Component {
  constructor() {
    super();

    this.state = {
      fetching: false,
      error: "",
      scale: 5,
      handle: "",
      wordPairs: [],
      selectedWord: null
    };
  }

  submitHandle = handle => {
    this.setState({ fetching: true, error: false });

    axios
      .get(`/words/${handle}`)
      .then(res => {
        // remove stop words
        const words = res.data.filter(
          word => !stopWords.includes(word.toLowerCase())
        );
        // convert array of words to a map
        // { word: frequency, word: frequency, ... }
        const wordMap = makeWordMap(words);
        // convert map to an array of key-value pairs
        //[ { word: frequency }, { word: frequency }, ...]
        const wordPairs = wordMapToPairs(wordMap);

        this.setState({
          fetching: false,
          handle,
          wordPairs
        });
      })
      .catch(err => {
        console.log(err);

        this.setState({
          fetching: false,
          error: "could not fetch tweets"
        });
      });
  };

  incScale = () => {
    const { scale } = this.state;
    if (scale < 10) {
      this.setState({ scale: scale + 1 });
    }
  };

  decScale = () => {
    const { scale } = this.state;
    if (scale > 1) {
      this.setState({ scale: scale - 1 });
    }
  };

  selectWord = word => {
    this.setState({
      selectedWord: word
    });
  };

  render() {
    const {
      fetching,
      error,
      wordPairs,
      handle,
      scale,
      selectedWord
    } = this.state;

    console.log(this.state);
    return (
      <Container>
        <Segment>
          <Header as="h1" textAlign="center">
            Twitter Word Cloud
          </Header>
        </Segment>
        <HandleInput submitHandle={this.submitHandle} />
        <ScaleInput
          value={scale}
          incScale={this.incScale}
          decScale={this.decScale}
        />

        <Segment>
          <WordInfo selectedWord={selectedWord} />

          {handle && (
            <Header as="h2" textAlign="center">
              @{handle}
            </Header>
          )}

          {fetching ? (
            <Loader active> Fetching Tweets... </Loader>
          ) : error ? (
            { error }
          ) : (
            <WordCloud
              wordPairs={wordPairs}
              scale={scale}
              onWordClick={this.selectWord}
            />
          )}
        </Segment>
      </Container>
    );
  }
}

export default App;
