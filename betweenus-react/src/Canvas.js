import React from 'react';


class Canvas extends React.Component {

  state = {
    virusImg: null
  }

  componentDidMount() {
    this.setState({virusImg: document.getElementById('virus')});
  }

  componentDidUpdate() {
    const ctx = this.canvas.getContext('2d');

    const background = new Image();
    background.src = this.props.background;

    background.onload = (() => {
      this.canvas.width = background.width;
      this.canvas.height = background.height;

      ctx.drawImage(background, 0, 0);

      this.props.boxes.forEach(box => this.drawBox(box.coord, box.label));
    });
  }

  drawBox(coord, isBad, lineWidth = 5) {
    const ctx = this.canvas.getContext('2d');

    let [x, y, width, height] = coord

    ctx.strokeStyle = isBad ? '#eb5569' : '#00b89c';
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.rect(x, y, width, height)
    ctx.stroke();

    if (isBad) {
      ctx.drawImage(this.state.virusImg, x, y);
    }
  }

  render() {
    return <>
      <canvas className="is-centered"
              ref={(canvas) => {
                this.canvas = canvas;
              }}/>
      <img id="virus" src="virus.png"/>
    </>
  }

}

export default Canvas;