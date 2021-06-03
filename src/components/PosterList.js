import React, { Component } from 'react'

class PosterList extends Component {
	renderPoster = () => {
		
	}

	render() {
		return (
			<div className="posterList">
				<h3 className="posterList--title">NOUVEAUX FILMS</h3>
				<div className="posterList--grid">
				{ this.renderPoster() }
				</div>
			</div>
		)
	}
}

export { PosterList }