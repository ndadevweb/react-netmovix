import React, { Component } from 'react'
import { Container, Stars } from './index'
import { calcTime, convertMoney } from '../utils/helpers'
import '../css/HeaderDetails.css'

class HeaderDetails extends Component {
	calcVote = () => {
		this.fakeArray1 = []
		this.fakeArray2 = []

		const vote = isNaN(this.props.vote) === true ? 0 : Math.round(this.props.vote / 2)
		const rest = 5 - vote

		for(let i = 0; i < vote; i++) {
			this.fakeArray1.push('1')
		}

		if(rest !== 0) {
			for(let i = 0; i < rest; i++) {
				this.fakeArray2.push('1')
			}
		}
	}

	render() {
		const imgSrc = this.props.imgSrc
		this.calcVote()

		return (
			<div className="headerDetails">
				<div className="badge-decoration">{ this.props.status }</div>
				<div className="HeaderDetails--poster">
					<img className="headerDetails--poster__img" src={ imgSrc } />
				</div>
				<div className="headerDetails--container">
					<h3 className="headerDetails--container__title">{ this.props.mTitle }</h3>
					<p className="headerDetails--container__desc">{ this.props.mDesc }</p>
					<div className="headerDetails--info">
						<Container iconName="clock" content={ calcTime( this.props.runtime ) } />
						<Stars fakeArray1={ this.fakeArray1 } fakeArray2={ this.fakeArray2} />
						<Container iconName="money" content={ isNaN(this.props.revenue) === true ? 'NC' : convertMoney( this.props.revenue ) } />
					</div>
				</div>
			</div>
		)
	}
}

export { HeaderDetails }