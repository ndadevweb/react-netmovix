import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import '../css/SearchBar.css'

class SearchBar extends Component {
	state = {
		value: ''
	}

	handleChange = event => {
		this.setState({ value: event.target.value })
	}

	render() {
		const { value } = this.state

		return (
			<div className="searchBar--container">
				<div className="searchBar">
					<input
						className="searchBar--input"
						type="text"
						placeholder="Rechercher un film"
						value={ value }
						onChange={ this.handleChange }
					/>
					<div
						onClick={ () => this.props.onSearchClick(value) }
						className="searchBar--submit"
					>
						<FontAwesome className="searchIcon" name="search" />
					</div>
				</div>
			</div>
		)
	}
}

export { SearchBar }