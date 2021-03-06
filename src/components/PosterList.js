import React, { Component } from 'react'
import { Poster } from './index'
import '../css/PosterList.css'

let wish;

class PosterList extends Component {
	renderPoster = () => {
		return this.props.movies.map(movie => {
			const imgSrc = movie.poster
			wish = false

			if(this.props.localMovies) {
				this.props.localMovies.forEach(localMovie => {
					if(movie.id === localMovie.id) {
						wish = true
					}
				})
			}

			return (
				<Poster
					key={ movie.id }
					imgSrc={ imgSrc }
					wished={ wish }
					movie={ movie }
					mTitle={ movie.title }
					mDesc={ movie.overview }
					id={ movie.id }
				/>
			)
		})
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