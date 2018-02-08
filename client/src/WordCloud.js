import React from "react";
import { makeFontSizeMapper } from "./utils";
import WordCloud from "react-d3-cloud";
import "./wordcloud.css";

class CustomWordCloud extends React.Component {
  constructor() {
    super();
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
    const svgWidth = isMobile ? 280 : 700;
    const svgHeight = Math.floor(svgWidth * 6 / 7);
    this.state = { svgWidth, svgHeight };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.scale !== this.props.scale;
  }

  render() {
    const { wordPairs, scale, onWordClick } = this.props;
    const { svgWidth, svgHeight } = this.state;

    return (
      <WordCloud
        data={wordPairs}
        fontSizeMapper={makeFontSizeMapper(scale)}
        onWordClick={word => {
          onWordClick(word);
        }}
        width={svgWidth}
        height={svgHeight}
      />
    );
  }
}

export default CustomWordCloud;
