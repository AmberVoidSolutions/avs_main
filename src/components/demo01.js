import { Component, useRef, useEffect } from 'react'

import styles from '../styles/demo01.module.scss'

/*const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}*/

const __FRAME_INTERVAL = 50


// Macro to return an x,y offset for a given direction faced
const getDirOffset = (direction) => {
	switch(direction) {
		case 'up' : return [0, -1];
		case 'down' : return [0, 1];
		case 'left': return [-1, 0];
		case 'right': return [1, 0];
		default:
	}
}

export default class Demo01 extends Component {
	constructor(props) {
		super(props);

		this.userInput = this.userInput.bind(this)
		this.renderCall = this.renderCall.bind(this)

		this._frame = 0;

		let boardWidth = 10;
		let boardHeight = 10;
		let viewportWidth = 5;
		let viewportHeight = 5;
		let cellSize = 40;

		let objects = {	'ground' :	{ physics : { type : 'none', canInterract : false, canStack : true }, graphic : { type : 'sprite', indices : [ 0 ], animations : [ 'bounce' ] } },
						'water' :	{ physics : { type : 'block', canInterract : false, canStack : true }, graphic : { type : 'sprite', indices : [ 3 ], animations : [ 'throb' ] } },
						'sand' :	{ physics : { type : 'block', canInterract : false, canStack : true }, graphic : { type : 'sprite', indices : [ 1 ], animations : [ 'bounce' ] } },
						'wall' :	{ physics : { type : 'block', canInterract : false, canStack : false }, graphic : { type : 'sprite', indices : [ 2 ] } },
						'blue' :	{ physics : { type : 'block', canInterract : false, canStack : true }, graphic : { type : 'block', colour : '#0000FF' } },
					  }

		let board = {	width : boardWidth,
						height : boardHeight,
						vWidth : viewportWidth,
						vHeight : viewportHeight,
						cellSize : cellSize,
						contents : [],
						objects : [ { x : 2, y : 2, type : 'water' },
									{ x : 3, y : 2, type : 'sand' },
									{ x : 0, y : 3, type : 'wall' },
									{ x : 1, y : 3, type : 'wall' },
									{ x : 2, y : 3, type : 'wall' },
									{ x : 3, y : 3, type : 'wall' },
									{ x : 4, y : 3, type : 'wall' },
									],
						spritesheet : { image : null, width : 0 }
					}

		let character = {	x : { pos : 0, speed : 1, steps : 0 },
							y : { pos : 0, speed : 1, steps : 0 },
							direction : 'up',
							framesPerStep : 2,
							child : null
						}


		// Pre-fill the board tiles
			let contents = []
			for(let y = 0; y < board.height; y++) {
				let row = []
				for(let x = 0; x < board.width; x++) {
					row.push('blue')
				}
				contents.push(row)
			}
			board.contents = contents



		// Set the state
		this.state = {	_timer : null,
						_canvasContext : null,
						objects,
						board,
						character,
					};
	}

	renderCall(context) {
		if(this.state._canvasContext !== context) {
			this.setState({ _canvasContext : context })
		}
	}

	userInput(e) {
		let character = this.state.character


		let setDir = (char, dir, stepsx, stepsy) => {
			char.x.steps = stepsx; char.x.pos = parseInt(char.x.pos)
			char.y.steps = stepsy; char.y.pos = parseInt(char.y.pos)
			char.direction = dir
		}

		switch(e.code) {
			case 'ArrowUp': setDir(character, 'up', 0, -1); break;
			case 'ArrowDown': setDir(character, 'down', 0, 1); break;
			case 'ArrowLeft': setDir(character, 'left', -1, 0); break;
			case 'ArrowRight': setDir(character, 'right', 1, 0); break;
			case 'Space':
				if(character.child === null) {
					// Try to pick up an object
					let [xOffset, yOffset] = getDirOffset(character.direction)
					
					for(let object of this.state.board.objects) {
						if(this.state.objects[object.type].physics.type === 'ignore') continue;

						if((object.x === character.x.pos + xOffset) && (object.y === character.y.pos + yOffset)) {
							character.child = object
							break;
						}
					}
				} else {
					// Drop the object
					character.child = null;
				}
				break;

			default:
				//console.log(e.code);
				return;
		}

		e.preventDefault()

		this.setState(character)
	}

	componentDidMount() {
		let { _timer, board } = this.state

		// Load the spritesheet
		if(board.spritesheet.image === null) {
			let img = new Image()
			img.src = '/images/demo01/spritesheet.png'

			board.spritesheet = { image : img, width : 10, cellWidth : 40, cellHeight : 40 };
		}


		// Set up the game timer
		if(_timer === null) {
			_timer = setInterval(() => {
									this._frame++
									let mutableStates = { objects : this.state.objects, board : this.state.board, character : this.state.character }
									processGameStep({
												context : this.state._canvasContext,
												frame : this._frame,
												...mutableStates
											})
									this.setState(mutableStates);
								}, __FRAME_INTERVAL)
		}

		this.setState({ _timer, board })
	}

	componentWillUnmount() {
		// Clean up the timer
		clearInterval(this.state._timer)
		this.setState({ _timer : null })
	}

	render() {
		return (<>
					<h3>Demo 01</h3>

					<div>Position: { this.state.character.x.pos }, { this.state.character.y.pos }</div>
					<div>Has child? { this.state.character.child ? 'Yes' : 'No' }</div>

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


function processGameStep({ context, frame, objects, board, character }) {
	calculateBoard(frame, objects, board, character)
	renderBoard(context, frame, objects, board, character)
}


function calculateBoard(frame, objects, board, character) {
	// Move the character's position along its current path (factoring in step speed)
		let newX = character.x.pos
		let newY = character.y.pos
		let childSize = character.child === null ? 0 : 1
		let [xOffset, yOffset] = getDirOffset(character.direction)

		if(character.x.steps || character.y.steps) {
			let maxDist = 1 / character.framesPerStep

			let travel = (pos, steps, speed, max) => {
				max *= speed
				if(Math.abs(steps * speed) > max)	{ pos += max * Math.sign(steps); steps -= Math.sign(steps) * max; }
				else								{ pos += steps * speed; steps = 0; }

				return [ pos, steps ]
			}

			[ newX, character.x.steps ] = travel(newX, character.x.steps, character.x.speed, maxDist);
			[ newY, character.y.steps ] = travel(newY, character.y.steps, character.y.speed, maxDist);
		}



	let getPosRange = (pos, offset) => { if(offset > 0) return [ pos, pos + offset ]; return [ pos + offset, pos ]; }
	let [ rangeXmin, rangeXmax ] = getPosRange(newX, childSize * xOffset)
	let [ rangeYmin, rangeYmax ] = getPosRange(newY, childSize * yOffset)

	// Make sure we're within the board
		let bound = (minpos, pos, maxpos, minlimit, maxlimit) => {	if(minpos < minlimit) return pos + (minlimit - minpos);
																	if(maxpos >= maxlimit) return pos + (maxlimit - maxpos);
																	return pos; }
		newX = bound(rangeXmin, newX, rangeXmax, 0, board.width - 1)
		newY = bound(rangeYmin, newY, rangeYmax, 0, board.height - 1)


	// Quick physics check
		// Macro - does the 1D vector minPos->maxPos, when traveling travelDist units, ever intercept fixedPos?
		let willCross = (fixedPos, minPos, maxPos, travelDist) => {
			let dir = Math.sign(travelDist)
			if(dir > 0) return (minPos <= fixedPos) && (maxPos + travelDist >= fixedPos)
			if(dir < 0) return (maxPos >= fixedPos) && (minPos + travelDist <= fixedPos)
			return (minPos <= fixedPos) && (maxPos >= fixedPos)
		}

		for(let object of board.objects) {
			if(objects[object.type].physics.type === 'ignore') continue;
			if(objects[object.type].physics.type === 'none') continue;
			if(character.child === object) continue;		// Don't collision detect with our own child

			// Process physics collision
			if(	willCross(object.x, rangeXmin, rangeXmax, Math.sign(character.x.steps)) &&
				willCross(object.y, rangeYmin, rangeYmax, Math.sign(character.y.steps))) {

				//Check to see if we're colliding with the object we're holding (if any)
				if(childSize) {
					let isObjCollision = !(willCross(object.x, newX, newX, Math.sign(character.x.steps)) && willCross(object.y, newY, newY, Math.sign(character.y.steps)));
					if(isObjCollision) {
						if(objects[character.child.type].physics.type === 'ignore') continue;
						if(objects[character.child.type].physics.type === 'none') continue;

						// Don't bother colliding if the objects are all stackable
						if(objects[object.type].physics.canStack && objects[character.child.type].physics.canStack) { continue; }
					}
				}

				newX = parseInt(character.x.pos)	// Align to the grid
				newY = parseInt(character.y.pos)
				character.y.steps = 0
				character.x.steps = 0
				break;
			}
		}

	character.x.pos = newX
	character.y.pos = newY
	if(character.child) {
		character.child.x = character.x.pos + xOffset
		character.child.y = character.y.pos + yOffset
	}
}





function renderBoard(ctx, frame, objects, board, character) {
	let cellSize = board.cellSize

	// No point clearing unless we need to
	ctx.clearRect(0, 0, 9999, 9999);

	// Try to put the character at the centre of the viewport
		let wHalf = board.vWidth / 2
		let hHalf = board.vHeight / 2
		let view = {	left : (character.x.pos) - wHalf,
						top : (character.y.pos) - hHalf,
						right : (character.x.pos) + wHalf,
						bottom : (character.y.pos) + hHalf,
						
						posx : wHalf,
						posy : hHalf,
					}

	// Correct the viewport if we're at the edge of the board
		let getBoundOffset = (outerMin, outerMax, innerMin, innerMax) => {
				let offset = 0

				if(innerMin < outerMin) offset = outerMin - innerMin
				if(innerMax >= outerMax) offset = outerMax - innerMax

				return offset
			}

		let xOffset = getBoundOffset(0, board.width, view.left, view.right)
		view.left += xOffset
		view.right += xOffset
		view.posx -= xOffset
		let yOffset = getBoundOffset(0, board.height, view.top, view.bottom)
		view.top += yOffset
		view.bottom += yOffset
		view.posy -= yOffset


	// Draw the board
		for(let y = parseInt(view.top); y < parseInt(view.bottom); y++) {
			let row = board.contents[parseInt(y)]
			for(let x = parseInt(view.left); x < parseInt(view.right); x++) {
				renderObject(	ctx,
								frame,
								{	left : ((x - view.left) * cellSize) + 1,
									top :  ((y - view.top) * cellSize) + 1,
									width : cellSize - 2,
									height : cellSize - 2,
								},
								row[parseInt(x)],
								objects[row[parseInt(x)]].graphic,
								board
							)
			}
		}

	// Draw the objects
		let withinBounds = (pos, min, max) => { return pos >= min && pos <= max; }
		board.objects.forEach(object => {
			if(withinBounds(object.x, view.left, view.right - 1) && withinBounds(object.y, view.top, view.bottom - 1)) {
				renderObject(	ctx,
								frame,
								{	left : ((object.x - view.left) * cellSize) + 5,
									top : ((object.y - view.top) * cellSize) + 5,
									width : cellSize - 10,
									height : cellSize - 10,
								},
								object,
								objects[object.type].graphic,
								board
							)
			}
		})

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





function renderObject(context, frame, bounds, object, graphic, board) {
	let sSheet = board.spritesheet;

	let destRect = {	left : bounds.left,
						top : bounds.top,
						width : bounds.width,
						height : bounds.height
					}

	if(graphic.animations && graphic.animations.includes('throb')) {
		let animLength = 20
		let shrink = (bounds.width / animLength) * (frame % animLength)
		destRect.left += shrink
		destRect.top += shrink
		destRect.width -= shrink * 2
		destRect.height -= shrink * 2
	}

	if(graphic.animations && graphic.animations.includes('bounce')) {
		let animLength = 5
		let hh = bounds.height / 2

		let shrink = (hh / animLength) * Math.abs((frame % (animLength * 2)) - animLength)
		destRect.top = (destRect.top + hh) - shrink
		destRect.height = (destRect.height - hh)
	}

	switch(graphic.type) {
		case 'sprite':
			if(!sSheet.image) break;

			let spriteIndex = 0
			let srcRect = {	left : (graphic.indices[spriteIndex] % sSheet.width) * sSheet.cellWidth,
							top : parseInt(graphic.indices[spriteIndex] / sSheet.width) * sSheet.cellHeight,
							width : sSheet.cellWidth,
							height : sSheet.cellHeight
						}

			context.drawImage(sSheet.image, srcRect.left, srcRect.top, srcRect.width, srcRect.height, destRect.left, destRect.top, destRect.width, destRect.height)
			break;

		default:
			context.fillStyle = graphic.colour
			context.beginPath()
			//context.rect(bounds.left + shrink, bounds.top + shrink, bounds.width - (2 * shrink), bounds.height - (2 * shrink))
			context.rect(destRect.left, destRect.top, destRect.width, destRect.height)
			context.fill()
	}
}