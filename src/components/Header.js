import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getNumber } from '../actions/movie'

import '../css/Header.css'

class HeaderComponent extends Component {
	componentDidMout() {
		this.props.getNumber()
	}

	render() {
		return (
			<div className="header">
				<Link to={ { pathname: '/' } }>
					<FontAwesome className="header--movie" name="film" size="5x" />
				</Link>
				<h3>NETMOVIX</h3>
				<FontAwesome className="header--heart" name="heart" size="5x" />
				<div className="header--badge">{ this.props.badge }</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		badge: state.movies.number
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getNumber: () => dispatch(getNumber())
	}
}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
/*
state = {
	movies: {
		movies: [],
		number: 0
	}
}*/

export { Header }