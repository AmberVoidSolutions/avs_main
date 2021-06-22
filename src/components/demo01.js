import { Component, useRef, useEffect, useState } from 'react'

import styles from '../styles/demo01.module.scss'

const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}


export default class Demo01 extends Component {
	constructor(props) {
		super(props);

		let boardWidth = 7;
		let boardHeight = 10;

		let character = { posx : 0, posy : 0 }

		this.userInput = this.userInput.bind(this)

		this.state = { boardWidth,
						boardHeight,
						board : null,

						character
					};
	}

	userInput(e) {
		let character = this.state.character
		switch(e.code) {
			case 'ArrowUp': character.posy--; e.preventDefault(); break;
			case 'ArrowDown': character.posy++; e.preventDefault(); break;
			case 'ArrowLeft': character.posx--; e.preventDefault(); break;
			case 'ArrowRight': character.posx++; e.preventDefault(); break;

			default:
		}

		if(character.posx < 0) character.posx = 0;
		if(character.posx >= this.state.boardWidth) character.posx = this.state.boardWidth - 1;
		if(character.posy < 0) character.posy = 0;
		if(character.posy >= this.state.boardHeight) character.posy = this.state.boardHeight - 1;

		this.setState(character)
		console.log(character.posx + " x " + character.posy);
	}

	render() {
		return (<>
					<h3>Demo 01</h3>

					<Board width={ this.state.boardWidth }
							height={ this.state.boardHeight }
							board={ this.state.board }
							character={ this.state.character }
							keyboardCallback={ this.userInput }
							/>
				</>
		);
	}
}

let Board = props => {
	let cellSize = 40;

	let [ canvasBoard, updateCanvasBoard ] = useState([0, 1, 2, 3])
	let canvasRef = useRef(null)

	// Initialise the board
	useConstructor(() => {
		if(props.board) {
			updateCanvasBoard(props.board)
		} else {
			let board = []
			for(let y = 0; y < props.height; y++) {
				let row = []
				for(let x = 0; x < props.width; x++) {
					row.push(0)
				}
				board.push(row)
			}

			updateCanvasBoard(board)
		}
	})




	let draw = (board, ctx) => {
		console.log("DRAWING BOARD")
		ctx.fillStyle = '#000000'

		/* Draw the board */
		for(let y = 0; y < board.length; y++) {
			let row = board[y]
			for(let x = 0; x < row.length; x++) {
				ctx.beginPath()
				ctx.arc((x * cellSize) + (cellSize / 2),
						(y * cellSize) + (cellSize / 2),
						cellSize / 2,
						0,
						2 * Math.PI
						)
				ctx.fill()
			}
		}

		/* Draw the character */
		ctx.fillStyle = '#ffffff'
		ctx.beginPath()
		ctx.arc((props.character.posx * cellSize) + (cellSize / 2),
				(props.character.posy * cellSize) + (cellSize / 2),
				cellSize / 2,
				0,
				2 * Math.PI
				)
		ctx.fill()
	}

	useEffect(() => {
			let canvas = canvasRef.current
			let context = canvas.getContext('2d')
			draw(canvasBoard, context)
	})

	return (<canvas ref={ canvasRef }
						className={ styles.board }
						width={ cellSize * props.width  }
						height={ cellSize * props.height }
						tabIndex={ 0 }
						onKeyDown={ (e) => { props.keyboardCallback(e) } }
					>
			</canvas>)
}