import React from 'react';
import _ from 'lodash';
import './assets/app.css';

// Board儿子: Square组件
// class Square extends React.Component {
//   render() {
//     console.log(`Square this.props:`, this.props);
//     return (
//       <button className={`square square-${this.props.index}`} onClick={e => this.props.clickBoard(e)}>
//         {this.props.index}
//       </button>
//     );
//   }
// }
// Board儿子: Square组件
function Square(props) {
  console.log(`Square props:`, props);
  return (
    <button
      style={{ color: props.index === 'X' ? 'red' : 'blue', backgroundColor: props.isGameOver ? '#ccc' : '' }}
      className={`square square-${props.index}`}
      onClick={props.clickBoard}>
      {props.index}
    </button>
  );
}

// Game儿子: Board组件: 游戏的 state 统一保存在 Board 组件中而不是各个 Square 组件中
class Board extends React.Component {
  // 所有有 constructor 的 React 组件类应该在其中首先调用 super(props) 函数
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(undefined),
      isNowX: true,
      isGameOver: false,
      lastIndex: undefined
    };
  }

  // handleClick事件
  handleClick(index, e) {
    // console.log(`Board handleClick this:`, this);
    console.log(`Board handleClick index:`, index);
    // console.log(`BoardhandleClick e:`, e);

    if (calculateWinner(this.state.squares)) {
      alert('游戏已经结束');
      return;
    }

    if (index === this.state.lastIndex) {
      alert('已经走过的地方不能重复点击');
      return;
    }

    const tempSquares = _.clone(this.state.squares);
    tempSquares[index] = this.state.isNowX ? 'X' : 'O';
    this.setState({
      lastIndex: index,
      squares: tempSquares,
      isNowX: !this.state.isNowX
    });

    this.timer = setTimeout(() => {
      if (calculateWinner(this.state.squares)) {
        this.setState({
          isGameOver: true
        });
      }
    }, 0);
  }

  componentWillMount() {
    clearTimeout(this.timer);
  }

  handleRestart(e) {
    console.log(`handleRestart e:`, e);
    console.log(`handleRestart this:`, this);

    let isStart = false;
    for (let index = 0; index < this.state.squares.length; index++) {
      const element = this.state.squares[index];
      if (element !== undefined) {
        isStart = true;
        break;
      }
    }

    if (!isStart) {
      alert('游戏还未开始');
      return;
    }

    if (!calculateWinner(this.state.squares)) {
      alert('游戏还在进行中');
      return;
    }

    this.setState({
      squares: Array(9).fill(undefined),
      isNowX: true,
      isGameOver: false,
      lastIndex: undefined
    });
  }

  renderSquare(index) {
    return (
      <Square
        isGameOver={this.state.isGameOver}
        index={this.state.squares[index]}
        clickBoard={this.handleClick.bind(this, index)}
      />
    );
  }

  render() {
    let status;
    const winner = calculateWinner(this.state.squares);

    if (winner) {
      status = `Winner is: ${winner}`;
    } else {
      status = `Next player: ${this.state.isNowX ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div>lastIndex:{JSON.stringify(this.state.lastIndex)}</div>
        <div className='status'>{status}</div>
        <button className='btn' onClick={this.handleRestart.bind(this)}>
          重新开始
        </button>
        <div style={{ backgroundColor: this.state.isGameOver ? '#ccc' : '' }}></div>
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

// 判断是否胜利并结束
function calculateWinner(squares) {
  console.log(`calculateWinner squares`, squares);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return undefined;
}

export default Game;
