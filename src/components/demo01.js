import { Component, useRef, useEffect } from 'react'

import styles from '../styles/demo01.module.scss'

/*const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}*/


export default class Demo01 extends Component {
	constructor(props) {
		super(props);

		this.userInput = this.userInput.bind(this)
		this.renderCall = this.renderCall.bind(this)

		this._frame = 0;

		let boardWidth = 20;
		let boardHeight = 20;
		let viewportWidth = 5;
		let viewportHeight = 5;
		let cellSize = 40;


		let board = {	width : boardWidth,
						height : boardHeight,
						vWidth : viewportWidth,
						vHeight : viewportHeight,
						cellSize : cellSize,
						contents : [],
						objects : [ { x : 4, y : 4, info : {} }]
					}

		let character = {	x : { pos : 0, speed : 1, steps : 0 },
							y : { pos : 0, speed : 1, steps : 0 },
							direction : 'up',
							framesPerStep : 2
						}


		// Pre-fill the board tiles
			let contents = []
			for(let y = 0; y < board.height; y++) {
				let row = []
				let coloury = parseInt(Math.abs((board.height / 2) - y))
				for(let x = 0; x < board.width; x++) {
					let colourx = parseInt(Math.abs((board.width / 2) - x))
					row.push(Math.abs(colourx - coloury))
				}
				contents.push(row)
			}
			board.contents = contents



		// Set the state
		this.state = {	_timer : null,
						_canvasContext : null,
						board,
						character,
					};
	}

	renderCall(context) {
		if(this.state._canvasContext !== context) {
			console.log("Setting context")
			this.setState({ _canvasContext : context })
		}
	}

	userInput(e) {
		let character = this.state.character

		switch(e.code) {
			case 'ArrowUp': character.y.steps = -1 * character.y.speed; character.direction = 'up'; e.preventDefault(); break;
			case 'ArrowDown': character.y.steps = +1 * character.y.speed; character.direction = 'down'; e.preventDefault(); break;
			case 'ArrowLeft': character.x.steps = -1 * character.x.speed; character.direction = 'left'; e.preventDefault(); break;
			case 'ArrowRight': character.x.steps = +1 * character.x.speed; character.direction = 'right'; e.preventDefault(); break;

			default:
		}

		this.setState(character)
	}

	componentDidMount() {
		if(this.state._timer === null) {
			this.setState({ _timer : setInterval(() => {
											this._frame++
											processGameStep({
														board : this.state.board,
														character : this.state.character,
														context : this.state._canvasContext,
														frame : this._frame
													}) }, 100)
							})
		}
	}

	componentWillUnmount() {
		clearInterval(this.state._timer)
		this.setState({ _timer : null })
	}

	render() {
		return (<>
					<h3>Demo 01</h3>

					<Board width={ this.state.board.width * this.state.board.cellSize }
							height={ this.state.board.height * this.state.board.cellSize }
							renderCallback={ this.renderCall }
							keyboardCallback={ this.userInput }
							/>
				</>
		);
	}
}

let Board = props => {
	let canvasRef = useRef(null)
	
	useEffect(() => {
			let canvas = canvasRef.current
			let context = canvas.getContext('2d')
			props.renderCallback(context)
			//renderBoard(context, canvasBoard, props.character)
	})

	return (<canvas ref={ canvasRef }
						className={ styles.board }
						width={ props.width  }
						height={ props.height }
						tabIndex={ 0 }
						onKeyDown={ (e) => { props.keyboardCallback(e) } }
					>
			</canvas>)
}


function processGameStep({ context, frame, board, character }) {
	calculateBoard(board, frame, character)
	renderBoard(context, frame, board, character)
}


function calculateBoard(board, frame, character) {
	if(character.x.steps || character.y.steps) {
		let maxDist = 1 / character.framesPerStep

		if(Math.abs(character.x.steps) > maxDist) {
			character.x.pos += maxDist * Math.sign(character.x.steps)
			character.x.steps = character.x.steps - (Math.sign(character.x.steps) * maxDist)
		} else {
			character.x.pos += character.x.steps
			character.x.steps = 0
		}

		if(Math.abs(character.y.steps) > maxDist) {
			character.y.pos += maxDist * Math.sign(character.y.steps)
			character.y.steps = character.y.steps - (Math.sign(character.y.steps) * maxDist)
		} else {
			character.y.pos += character.y.steps
			character.y.steps = 0
		}
	}

	let bound = (pos, min, max) => { if(pos < min) return min; if(pos >= max) return max; return pos }
	character.x.pos = bound(character.x.pos, 0, board.width - 1)
	character.y.pos = bound(character.y.pos, 0, board.height - 1)
}





function renderBoard(ctx, frame, board, character) {
	let cellSize = board.cellSize

	// No point clearing unless we need to
	ctx.clearRect(0, 0, 9999, 9999);

	// Put the character midway through the viewport
		let wHalf = board.vWidth / 2
		let hHalf = board.vHeight / 2
		let view = {	left : parseInt(character.x.pos) - wHalf,
						top : parseInt(character.y.pos) - hHalf,
						right : parseInt(character.x.pos) + wHalf,
						bottom : parseInt(character.y.pos) + hHalf,
						
						posx : wHalf,
						posy : hHalf,
					}

	// Correct the viewport if we're at the edge of the board
		let getBoundOffset = (outerMin, outerMax, innerMin, innerMax) => {
				let offset = 0

				if(innerMin < outerMin) offset = innerMin - outerMin
				if(innerMax >= outerMax) offset = innerMax - outerMax
				
				return -offset
			}

		let xOffset = getBoundOffset(0, board.width, view.left, view.right)
		view.left += xOffset
		view.right += xOffset
		view.posx -= xOffset
		let yOffset = getBoundOffset(0, board.height, view.top, view.bottom)
		view.top += yOffset
		view.bottom += yOffset
		view.posy -= yOffset
		console.log("Getting [" + view.left + "," + view.top + "] - [" + view.right + ", " + view.bottom + "]: +" + xOffset + ", +" + yOffset)


	// Draw the board
		let styles = [ '#660000', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff' ]
		for(let y = parseInt(view.top); y < parseInt(view.bottom); y++) {
			let row = board.contents[parseInt(y)]
			for(let x = parseInt(view.left); x < parseInt(view.right); x++) {
				ctx.fillStyle = styles[row[parseInt(x)]]
				ctx.beginPath()
				ctx.rect(((x - view.left) * cellSize) + 1, ((y - view.top) * cellSize) + 1, cellSize - 2, cellSize - 2)
				ctx.fill()
			}
		}

	// Draw the objects
		let withinBounds = (pos, min, max) => { return pos >= min && pos <= max; }
		board.objects.forEach(object => {
			if(withinBounds(object.x, view.left, view.right) && withinBounds(object.y, view.top, view.bottom)) {
				renderObjectA(ctx, frame, { left : ((object.x - view.left) * cellSize) + 5,
										top : ((object.y - view.top) * cellSize) + 5,
										width : cellSize - 10,
										height : cellSize - 10,
									})
			}
		})
		//*/

	// Draw the character
		let posx = (view.posx * cellSize) + (cellSize / 2)
		let posy = (view.posy * cellSize) + (cellSize / 2)
		let radius = cellSize / 2

		ctx.fillStyle = '#ffffff'
		ctx.beginPath()
		let offset = 0;
		switch(character.direction) { case 'down': offset = 0.5; break; case 'left': offset = 1; break; case 'up': offset = 1.5; break; default: }
		ctx.arc(posx, posy, radius, (1.5 + offset) * Math.PI, (0.5 + offset) * Math.PI)
		ctx.fill()
}





function renderObjectA(context, frame, bounds) {
	let animLength = 20
	let shrink = (bounds.width / animLength) * (frame % animLength)

	context.fillStyle = '#000000'
	context.beginPath()
	context.rect(bounds.left + shrink, bounds.top + shrink, bounds.width - (2 * shrink), bounds.height - (2 * shrink))
	context.fill()
}