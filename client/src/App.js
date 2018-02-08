import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import WordCloud from "react-d3-cloud";
import HandleInput from "./HandleInput";
import ScaleInput from "./ScaleInput";
// const FontSizeMapper = word => Math.log2(word.value) * ratio;

const makeFontSizeMapper = scale => word => Math.log2(word.value) * scale;

const rotate = word => word.value % 360;

class App extends Component {
  state = {
    scale: 10,
    handle: "",
    wordPairs: []
  };

  setWordPairs = pairs => {
    this.setState({ wordPairs: pairs });
  };

  submitHandle = handle => {
    axios
      .get(`/words/${handle}`)
      .then(res => {
        const words = res.data;

        const wordMap = words.reduce(
          (map, word) =>
            word in map
              ? { ...map, [word]: map[word] + 1 }
              : { ...map, [word]: 1 },
          Object.create(null)
        );

        const wordPairs = Object.keys(wordMap).map(key => ({
          text: key,
          value: wordMap[key]
        }));

        this.setState({
          handle,
          wordPairs
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { wordPairs, handle, scale } = this.state;
    return (
      <div className="App">
        <h1>Twitter Word Cloud</h1>
        <HandleInput submitHandle={this.submitHandle} />
        {handle && <h2> handle: {handle} </h2>}
        <p>
          <label>
            scale{": "}{" "}
            <ScaleInput value={scale} handleChange={this.handleChange} />
          </label>
        </p>
        <WordCloud
          data={wordPairs}
          fontSizeMapper={makeFontSizeMapper(scale)}
        />
      </div>
    );
  }
}

export default App;
