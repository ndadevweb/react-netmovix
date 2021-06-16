import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addMovie, removeMovie } from '../actions/movie'
import '../css/Poster.css'

class PosterComponent extends Component {
	state = {
		hover: false
	}

	showOverlay = () => {
		if(this.state.hover === false) {
			this.setState({ hover: true })
		}
	}

	hideOverlay = () => {
		this.setState({ hover: false })
	}

	remove = () => {
		this.props.removeM(this.props.id)
	}

	add = () => {
		this.props.addM(this.props.movie)
	}

	render() {
		return (
			<div
				onMouseEnter={ this.showOverlay }
				onMouseLeave={ this.hideOverlay }
				className="poster"
			>
				<Link to={ { pathname: `/${ this.props.id }`} }>
					<img className="poster--img" src={ this.props.imgSrc } title={ this.props.mTitle } alt={ this.props.mTitle } />
				</Link>
				{ this.state.hover === true ? (
					<div className="poster--overlay">
						<h3 className="poster--overlay__text">LISTE DE SOUHAITS</h3>
						{ this.props.wished === true ? (
							<FontAwesome onClick={ this.remove } className="poster--icon" name="heart" size="3x" />
						) :
						(
							<FontAwesome onClick={ this.add } className="poster--icon__not" name="heart-o" size="3x" />
						)}
					</div>
				) : null}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addM: movie => dispatch(addMovie(movie)),
		removeM: movieId => dispatch(removeMovie(movieId))
	}
}

const Poster = connect(null, mapDispatchToProps)(PosterComponent)

export { Poster }