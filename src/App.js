import React from 'react';
import './assets/app.css';

// Square组件
class Square extends React.Component {
  // 所有有 constructor 的 React 组件类应该在其中首先调用 super(props) 函数
  constructor(props) {
    super(props);

    this.state = {
      index: null
    };
  }

  // // handleClick事件
  // handleClick(index, e) {
  //   console.log(`e`, e);
  //   e.preventDefault();
  //   console.log(`index:`, index);
  //   this.setState({
  //     index: index
  //   });
  // }

  render() {
    console.log(`this.props:`, this.props);
    return (
      // <button className={`square square-${this.props.index}`} onClick={this.handleClick.bind(this, this.props.index)}>
      //   {this.state.index}
      // </button>
      <button className={`square square-${this.props.index}`}>{this.state.index}</button>
    );
  }
}

// Board组件
class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null)
    };
  }

  // handleClick事件
  handleClick(index, e) {
    console.log(`Board handleClick e`, e);
    e.preventDefault();
    console.log(`Board handleClick index:`, index);
    // this.setState({
    //   index: index
    // });
  }

  renderSquare(index) {
    return <Square onClick={this.handleClick.bind(this, index)} index={this.state.squares[index]} />;
  }

  render() {
    const status = 'Next player: 柯南';

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

// Game组件
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
