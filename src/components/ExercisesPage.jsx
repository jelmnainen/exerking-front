import React, { Component } from 'react';
import ExercisesList from './ExercisesList';

export default class ExercisesPage extends Component {
	
	render() {
		return (
			<div className="exercises-page">
				<h3>Exercises</h3>
				<ExercisesList {...this.props}/>

			</div>
			)
	}

	componentDidMount() {
		this.props.exercisesActions.fetchExercises();
	}
}