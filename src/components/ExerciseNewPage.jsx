import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ExercisesNewPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { inProgress } = this.props;
    const { addExercise } = this.props;
    const title = this.refs.title.value;
    const text = this.refs.text.value;
    const deadline = this.refs.deadline.value;

    if(inProgress){
      return;
    }

    addExercise({title,text,deadline});

  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  render() {
    const { inProgress, errorMessages } = this.props;

    let titleErrors;
    let textErrors;
    let deadlineErrors;

    if (errorMessages && errorMessages.title) {
      titleErrors = <p>{ errorMessages.title.join(', ') }</p>;
    }
    if (errorMessages && errorMessages.text) {
      textErrors = <p>{ errorMessages.text.join(', ') }</p>;
    }
    if (errorMessages && errorMessages.deadline) {
      deadlineErrors = <p>{ errorMessages.text.join(', ') }</p>;
    }

    return (
        <div className="exercise-add">
          <h2>Add new excercise</h2>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Title</label>
              <input ref="title" />
              { titleErrors }
            </div>
            <div>
              <label>Text</label>
              <textarea ref="text" />
              { textErrors }
            </div>
            <div>
              <label>Deadline</label>
              <input type="date" ref="deadline" />
              { deadlineErrors }
            </div>
            <button disabled={ inProgress } type="submit">Add Exercise</button>
          </form>

        </div>
    );
  }

}
