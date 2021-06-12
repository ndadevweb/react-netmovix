import React, { Component } from 'react'
import '../css/Actor.css'

class Actor extends Component {
	state = {
		hover: false,
	}

	showOverlay = () => {
		if(this.state.hover === false) {
			this.setState({ hover: true })
		}
	}

	hideOverlay = () => {
		this.setState({ hover: false })
	}

	render() {
		const name = this.props.name
		const character = this.props.character

		return (
			<div
				onMouseEnter={ this.showOverlay }
				onMouseLeave={ this.hideOverlay }
				className="actor"
			>
				<img className="actor--img" alt="actor" src={ this.props.imgSrc } />
					{ this.state.hover ?
						(
							<div className="actor--overlay">
							<h3 className="actor--name">{ name }</h3>
							<p className="actor--name">{ character }</p>
							{/*<h3 className="actor--name">{ name[0] }</h3>
							<h3 className="actor--name">{ name[1] }</h3>*/}
							</div>
						) : null						
					}
			</div>
		)
	}
}

export { Actor }