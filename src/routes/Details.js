import React, { Component } from 'react'
import axios from 'axios'
import { Spinner, HeaderDetails, ActorList } from '../components'
import { API_URL_MOVIE_BY_ID } from '../config'

class Details extends Component {
	state = {
		loading: true,
		actors: [{ character: 'NC', name: 'NC' }],
		mTitle: '',
		mDesc: '',
		imgSrc: '',
		revenue: '',
		runtime: '',
		status: 'Released',
		vote: ''
	}

	async componentDidMount() {
		try {
			const movieId = parseInt(this.props.match.params.id)
			const url = `${ API_URL_MOVIE_BY_ID }${ movieId }`
			const { data : {
				revenue = 'NC',
				overview = 'NC',
				status = 'NC',
				vote_average = 'NC',
				poster,
				duration,
				title
			} } = await this.loadInfos(url)

			this.setState({
				revenue: revenue,
				runtime: duration,
				mTitle: title,
				mDesc: overview,
				status: status,
				imgSrc: poster,
				vote: vote_average
			}, async () => {
				const { data : { movies } } = await this.loadInfos('./actorsByMovie.json')
				const data = movies.filter(movie => parseInt(movie.id) === movieId )
				let newState = {}

				if(data.length === 1) {
					const { id, actors } = data[0]
					newState = { actors: actors, loading: false }
				} else {
					newState = { loading: false }
				}

				this.setState(newState)
			})
		} catch(e) {
			
		}
	}

	loadInfos = url => axios.get(url)

	render() {
		const { loading, mTitle, mDesc, actors, imgSrc, revenue, runtime, status, vote } = this.state

		return (
			<div className="app">
				{ loading === true ?
					(
						<Spinner />
					) :
					(
						<>
							<HeaderDetails
								mTitle={ mTitle }
								mDesc={ mDesc }
								imgSrc={ imgSrc }
								runtime={ runtime }
								revenue={ revenue }
								status={ status }
								vote={ vote }
							/>
							<ActorList actors={ actors } />
						</>
					)
				}
			</div>
		)
	}
}

export { Details }