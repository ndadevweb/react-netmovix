import React, { Component } from 'react'
import { VideoPlayer, MvPlayerList, Spinner } from '../components/'
import axios from 'axios'
import _ from 'lodash'
import { API_URL_MOVIE_BY_ID } from '../config'
import { calcTime } from '../utils/helpers'
import '../css/MoviePlayer.css'

const selectedMovie = {
	duration: "2h 9m",
	id: 56628,
	imageUrl: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2019/03/spider-man-far-from-home-poster-london.jpg",
	title: "SpiderMan Far from home",
	videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
}


const movies = [
	{
	duration: "2h 9m",
	id: "56628",
	imageUrl: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2019/03/spider-man-far-from-home-poster-london.jpg",
	title: "SpiderMan Far from home",
	videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
	},
	{
	duration: "2h 9m",
	id: "27699",
	imageUrl: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2019/03/spider-man-far-from-home-poster-london.jpg",
	title: "SpiderMan Far from home",
	videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
	}
]

let newMovies = []

class MoviePlayer extends Component {
	state = {
		movies: movies,
		selectedMovie: selectedMovie,
		loading: false
	}

	async componentDidMout() {
		const oldMovies = JSON.parse(localStorage.getItem('movies'))
		const results = await this.getNewMovies(oldMovies)
		newMovies = oldMovies.map((oldMovie, index) => {
			return {
				id: oldMovie.id,
				position: index + 1,
				title: oldMovie.title,
				duration: results[index],
				imageUrl: '',
				videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
			}
		})

		const id = this.props.match.params.id

		if(id) {
			const selectedMovie = this.getSelectedMovie(newMovies, id)
			this.setState({
				loading: false,
				movies: [...newMovies],
				selectedMovie
			})
		} else {
			const selectedMovie = newMovies[0]
			this.setState({
				loading: false,
				movies: [...newMovies],
				selectedMovie
			})
			this.props.history.push({
				pathname: `/player/${selectedMovie.id}`
			})
		}
	}

	componentDidUpdate(prevProps) {
		if(prevProps.match.params.id !== this.props.match.params.id) {
			const id = this.props.match.params.id
			const selectedMovie = this.getSelectedMovie(newMovies, id)
			this.setState({ selectedMovie })
		}
	}

	getSelectedMovie = (movies, movieId) => {
		const selectedMovie = _.find(movies, { id: parseInt(movieId) })

		return selectedMovie
	}

	handleEnded = () => {
		const { movies, selectedMovie } = this.state
		const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id)
		const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1
		const newSelectedMovie = movies[nextMovieIndex]
		this.props.history.push({
			pathname: `/player/${newSelectedMovie.id}}`
		})
		this.setState({ selectedMovie: newSelectedMovie })
	}

	getTime = movieId => {
		return new Promise((resolve, reject) => {
			const url = `${API_URL_MOVIE_BY_ID}/${movieId}`
			axios.get(url).then(data => {
				const duration = data.data.duration
				resolve(duration)
			}).catch(e => {
				console.log('e', e)
				reject('error', e)
			})
		})
	}

	getNewMovies = async oldMovies => {
		let promises = []
		for(let i = 0; i < oldMovies.length; i++) {
			const element = oldMovies[i]
			const id = element.id
			const time = await this.getTime(id)
			promises.push(calcTime(time))
		}

		return Promise.all(promises)
	}

	render() {
		const { movies, selectedMovie } = this.state

		return (
			<div className="moviePlayer">
			{ this.state.loading ?
			(
				<Spinner />
			) :
			(
				<>
					<VideoPlayer
						videoUrl={ selectedMovie.videoUrl }
						imageUrl={ selectedMovie.imageUrl }
						handleEnded={ this.handleEnded }
					/>
					<MvPlayerList 
						movies={ movies }
						selectedMovie={ selectedMovie }
					/>
				</>			
			)
			}
			</div>
		)
	}
}

export { MoviePlayer }