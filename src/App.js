import React from 'react';
import _ from 'lodash';
import './assets/app.css';

// Board儿子: Square组件
class Square extends React.Component {
  render() {
    // console.log(`Square this.props:`, this.props);
    return (
      <button className={`square square-${this.props.index}`} onClick={e => this.props.clickBoard(e)}>
        {this.props.index}
      </button>
    );
  }
}

// Game儿子: Board组件: 游戏的 state 统一保存在 Board 组件中而不是各个 Square 组件中
class Board extends React.Component {
  // 所有有 constructor 的 React 组件类应该在其中首先调用 super(props) 函数
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(undefined)
    };
  }

  // handleClick事件
  handleClick(index, e) {
    // console.log(`Board handleClick this:`, this);
    console.log(`Board handleClick index:`, index);
    // console.log(`BoardhandleClick e:`, e);
    const tempSquares = _.clone(this.state.squares);
    tempSquares[index] = 'X';
    this.setState({
      squares: tempSquares
    });
  }

  renderSquare(index) {
    return <Square clickBoard={this.handleClick.bind(this, index)} index={this.state.squares[index]} />;
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

// 自己: Game组件
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
