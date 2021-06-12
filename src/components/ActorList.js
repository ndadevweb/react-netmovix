import React from 'react'
import { Actor } from './index'
import '../css/ActorList.css'

const ActorList = props => {
	const renderActor = () => {
		return props.actors.map((actor, i) => {
			const imgSrc = actor.hasOwnProperty('image') && actor.image.length > 0
				? actor.image
				: './images/no_image.jpg'

			return (
				<Actor key={ i } imgSrc={ imgSrc } name={ actor.name } character={ actor.character } hover={ false } />
			)
		})
	}

	return (
		<div className="actorList">
			<h3 className="actorList--title"> ACTEURS </h3>
			<div className="actorList--grid">{ renderActor() }</div>
		</div>
	)
}

export { ActorList }