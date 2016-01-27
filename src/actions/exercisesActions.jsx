const EXERCISES_URL = process.env.API_URL + '/exercises';

export const EXERCISES_REQUEST = 'EXERCISES_REQUEST';
export const EXERCISES_REQUEST_SUCCESS = 'EXERCISES_REQUEST_SUCCESS';

const requestExercises = () => ({type: EXERCISES_REQUEST});

const receiveExercises = (exercises) => ({
	type: EXERCISES_REQUEST_SUCCESS,
	payload: exercises
});

export const fetchExercises = () =>
	dispatch => {

		dispatch(requestExercises());
		fetch(EXERCISES_URL, {
			headers: {
				Accept: 'application/json'
			}
		})
			.then(response => response.json())
			.then(exercises => dispatch(receiveExercises(exercises)))
			.catch(e => console.log(e));
	};
