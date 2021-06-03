import React, { Component } from 'react'
import { HeaderImg, SearchBar, PosterList, LoadButton } from '../components'

const movies = [
	{
		backdrop_path: './images/Fast_large.jpg',
		id: 475557,
		overview: "Lorem ipsum...",
		poster_path: './images/Fast_small.jpg',
		title: "Fast and Furious"
	},
	{
		backdrop_path: './images/Fast_large.jpg',
		id: 475558,
		overview: "Lorem ipsum...",
		poster_path: './images/Fast_small.jpg',
		title: "Fast and Furious"
	},
	{
		backdrop_path: './images/Fast_large.jpg',
		id: 475559,
		overview: "Lorem ipsum...",
		poster_path: './images/Fast_small.jpg',
		title: "Fast and Furious"
	},
	{
		backdrop_path: './images/Fast_large.jpg',
		id: 475560,
		overview: "Lorem ipsum...",
		poster_path: './images/Fast_small.jpg',
		title: "Fast and Furious"
	}
];

class Home extends Component {
	render() {
		return (
			<div>
				<HeaderImg
					title="Fast and Furious"
					overview="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
					imgSrc={ './images/Fast_large.jpg' }
				/>
				<SearchBar />
				<PosterList movies={ movies } />
				<LoadButton loading={ false } />
			</div>
		)
	}
}

export { Home }