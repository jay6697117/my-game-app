import React from 'react';
import './assets/app.css';

// Square组件
class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: undefined,
    };
  }
  render() {
    console.log(`this.props:`, this.props);
    return (
      <button className={`square square-${this.props.index}`} onClick={e => alert(this.props.index)}>
        {this.state.index}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(index) {
    return <Square index={index} />;
  }

  render() {
    const status = 'Next player: 张娜拉';

    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
