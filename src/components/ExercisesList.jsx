import React, { Component } from 'react';

export default class ExerciseList extends Component {

	render() {
		const { exercises } = this.props;
		return(
			<div className="exerciseList">
				<ul>	
					{exercises.map((exercise) =>
						(<li key={exercise.id}>{exercise.text}</li>)
					)}
				</ul>	
			</div>
			);
	}

};