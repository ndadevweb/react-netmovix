import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './routes'
import { Header, Spinner } from './components'
import { API_URL_LAST, API_URL_SEARCH } from './config'
import './App.css';

class App extends Component {
	state = {
		loading: true,
		movies: [],
		badge: 0,
		image: null,
		mTitle: '',
		mDesc: '',
		activePage: 0,
		totalPages: 0,
		searchText: ''
	}

	async componentDidMount() {
		try {
			const { data: { current_page, data } } = await this.loadMovies()
			const { results = data, page = current_page, total_pages = 1 } = data

			this.setState({
				movies: results,
				loading: false,
				activePage: page,
				totalPages: total_pages,
				image: results[0].poster,
				mTitle: results[0].title,
				mDesc: 'No description for this movie.'
			})
		} catch(e) {
			console.log('e ', e)
		}
	}

	loadMovies = () => {
		const page = this.state.activePage + 1
		const url = `${ API_URL_LAST }?page=${ page }`

		return axios.get(url)
	}

	searchMovie = () => {
		const url = `${ API_URL_SEARCH }${ this.state.searchText }`

		return axios.get(url)
	}

	handleSearch = value => {
		try {
			this.setState({
				loading: true,
				searchText: value,
				image: null
			}, async () => {
					const { data: { current_page, data } } = await this.searchMovie()
					const { results = data, page = current_page, total_pages = 1 } = data
					const hasData = results.length

					this.setState({
						movies: results,
						loading: false,
						activePage: page,
						totalPages: total_pages,
						image: hasData ? results[0].poster : '',
						mTitle: hasData ? results[0].title : '',
						mDesc: hasData ? results[0].overview : ''
					})
				}
			)
		} catch(e) {
			console.log('e ', e)
		}
	}

	loadMore = async () => {
		try {
			this.setState({ loading: true })
			const { data: { current_page, data } } = await this.loadMovies()
			const { results = data, page = current_page, total_pages = 1 } = data

			this.setState({
				movies: [...this.state.movies, ...results],
				loading: false,
				activePage: page,
				totalPages: total_pages,
				image: results[0].poster,
				mTitle: results[0].title,
				mDesc: results[0].overview
			})
		} catch(e) {
			console.log('e ', e)
		}
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header badge={ this.state.badge } />
					{ this.state.image == false ?
						(
							<Spinner />
						) :
						(
							<Switch>
								<Route path="/" exact render={ () => (
									<Home
										{ ...this.state }
										onSearchClick={ this.handleSearch }
										onButtonClick={ this.loadMore }
									/>
								)} />
							</Switch>
						)
					}
				</div>
			</Router>
		)
	}
}

export default App;