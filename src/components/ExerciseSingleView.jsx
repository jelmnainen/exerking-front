import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';
import cn from 'classnames';
import moment from 'moment';

export default class ExerciseSingleView extends Component {

  constructor() {
    super();
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchExercise(this.props.params.id);
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

    if (this.props.exercise.get('file_upload')) {
      const file = this.refs.file.files[0];
      const reader = new FileReader();

      reader.onload = ({ target: { result } }) => {
        const fileContent = result.substr(result.indexOf(',') + 1);
        submitExercise(id, feedback, fileContent, file.type);
      };

      reader.readAsDataURL(file);
    } else {
      submitExercise(id, feedback);
    }
  }

  renderSubmissionList() {
    const { submissions } = this.props;

    if (submissions.isEmpty()) {
      return (
        <p>No submissions made</p>
      );
    }

    return (
      <div className="ui relaxed divided list">
        {submissions.valueSeq().map(submission => this.renderSubmission(submission))}
      </div>
    );
  }

  renderSubmission(submission) {
    return (
      <div key={submission.get('id')} className="item">
        <i className={cn('square icon', submission.get('done') ? 'green check' : 'red minus')} />
        <div className="content">
          {moment(submission.get('created_at')).fromNow()}
          {submission.get('feedback') && <p>Feedback: {submission.get('feedback')}</p>}
        </div>
      </div>
    );
  }

  renderSubmitSegment() {
    const { exercise } = this.props;
    if (moment().isAfter(exercise.get('deadline'))) {
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

  renderUploadStatus() {
    const { addRequest } = this.props;
    if (addRequest.get('isCreated')) {
      return (
        <div className="ui attached positive message">
          <i className="success icon" />
          Submission created successfully!
        </div>
      );
    }
    if (addRequest.get('isError')) {
      return (
        <div className="ui attached negative message">
          Error!
        </div>
      );
    }
    return null;
  }

  renderCategoryRibbon(exercise) {
    if (!exercise.get('category_id')) {
      return null;
    }
    const category = this.props.categories.get(exercise.get('category_id'));
    return (
      <span className={`ui tiny ${category.get('color')} ribbon label`}>
        {category.get('title')}
      </span>
    );
  }

  renderForm() {
    const { exercise } = this.props;
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        {this.renderUploadStatus()}
        {exercise.get('file_upload') &&
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
          <h1 className="ui large header">{exercise.get('title')}</h1>

          <div className="ui grid">

            <div className="ten wide column">
              <div className="ui segments">
                <div className="ui secondary raised segment">
                  {this.renderCategoryRibbon(exercise)}
                  Deadline: {moment(exercise.get('deadline')).format('LLL')}
                </div>
                <div className="ui segment">
                  <Markdown source={exercise.get('text')} container="div" />
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
    id: PropTypes.string.isRequired,
  }).isRequired,
  fetchExercise: PropTypes.func.isRequired,
  onPageLeave: PropTypes.func.isRequired,
  submitExercise: PropTypes.func.isRequired,
  exercise: PropTypes.object,
  submissions: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
};
