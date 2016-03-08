import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import moment from 'moment';

export default class ExerciseSingleView extends Component {

  constructor() {
    super();
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.exercisesActions.fetchSingleExercise(this.props.params.id);
    this.props.fetchSubmissions(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onFileChange(event) {
    const path = event.target.value;
    const filename = path.match(/[^\\\/]+$/)[0];
    this.refs.filename.value = filename;
  }

  onSubmit(event) {
    event.preventDefault();
    const { submitExercise } = this.props;
    const { id } = this.props.params;
    const feedback = this.refs.feedbackAsked.checked;

    if (this.props.exercise.file_upload) {
      const file = this.refs.file.files[0];
      const reader = new FileReader();

      reader.onload = (data) => {
        submitExercise(id, feedback, btoa(data.target.result), file.type);
      };

      reader.readAsText(file);
    } else {
      submitExercise(id, feedback);
    }
  }

  renderSubmissionList() {
    const { submissions } = this.props;

    if (Object.keys(submissions).length === 0) {
      return (
        <p>No submissions made</p>
      );
    }

    return (
      <div className="ui relaxed divided list">
        {Object.keys(submissions).map(id => this.renderSubmission(submissions[id]))}
      </div>
    );
  }

  renderSubmission(submission) {
    return (
      <div key={submission.id} className="item">
        <i className={cn('square icon', submission.done ? 'green check' : 'red minus')} />
        <div className="content">
          {moment(submission.created_at).fromNow()}
          {submission.feedback && <p>Feedback: {submission.feedback}</p>}
        </div>
      </div>
    );
  }

  renderSubmitSegment() {
    const { exercise } = this.props;
    if (moment().isAfter(exercise.deadline)) {
      return (
        <div className="ui attached negative message">
          <i className="warning icon" />
          Deadline has expired.
        </div>
      );
    }
    return (
      <div className="ui segment">
        <h2 className="ui small header">Submit exercise</h2>
        {this.renderForm()}
      </div>
    );
  }

  renderForm() {
    const { exercise } = this.props;
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        {exercise.file_upload &&
          <div className="field">
            <input
              style={{ display: 'none' }}
              type="file"
              id="submission-file"
              ref="file"
              onChange={this.onFileChange}
            />
            <div className="ui mini action input">
              <input readOnly ref="filename" />
              <label className="ui mini button" htmlFor="submission-file">Select file</label>
            </div>
          </div>
        }
        <div className="inline field">
          <div className="ui checkbox">
            <input type="checkbox" ref="feedbackAsked" />
            <label>Ask for feedback</label>
          </div>
        </div>
        <button className="compact ui primary small button" type="submit">Submit</button>
      </form>
    );
  }

  render() {
    const { exercise } = this.props;

    if (!exercise) {
      return <div>Loading</div>;
    }

    return (
      <div className="row">
        <div className="column">
          <h1 className="ui large header">{exercise.title}</h1>
          <div className="ui grid">

            <div className="ten wide column">
              <div className="ui segments">
                <div className="ui secondary segment">
                  <p>Deadline: {moment(exercise.deadline).format('LLL')}</p>
                </div>
                <div className="ui segment">
                  <p>{exercise.text}</p>
                </div>
              </div>
            </div>

            <div className="six wide column">
              <div className="ui segments">
                {this.renderSubmitSegment()}
                <div className="ui segment">
                  <h2 className="ui small header">Submissions</h2>
                  {this.renderSubmissionList()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

}


ExerciseSingleView.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  exercisesActions: PropTypes.objectOf(PropTypes.func),
  fetchSubmissions: PropTypes.func,
  onPageLeave: PropTypes.func,
  submitExercise: PropTypes.func,
  exercise: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    deadline: PropTypes.string,
    file_upload: PropTypes.boolean,
  }),
  submissions: PropTypes.object,
};
