import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SubmissionsList extends Component {


  renderSubmission(submission) {
    const { exercises } = this.props;
    let feedback;

    if (submission.feedback_asked) {
      if (submission.feedback) {
        feedback = (
          <span className="ui tiny green basic label">Feedback given</span>
        );
      } else {
        feedback = (
          <span className="ui tiny red basic label">Feedback pending</span>
        );
      }
    }

    return (
      <div key={submission.id} className="ui raised segment">
        {exercises[submission.exercise_id].title} by {submission.user_id}
        {' '}
        {feedback} {' '}
        {!submission.done &&
          <span className="ui tiny basic label">Not accepted</span>
        }
        <Link
          className="ui mini compact blue button right floated"
          to={`/submissions/${submission.id}`}
        >
          View
        </Link>
      </div>
    );
  }

  render() {
    const { submissions } = this.props;
    return (
      <div className="ui stacked segments">
        {Object.keys(submissions).map(id => this.renderSubmission(submissions[id]))}
      </div>
    );
  }

}
