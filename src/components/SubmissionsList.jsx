import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SubmissionsList extends Component {


  renderSubmission(submission) {
    const { exercises, users } = this.props;
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
        {exercises[submission.exercise_id] && exercises[submission.exercise_id].title} by
        {users[submission.user_id] && users[submission.user_id].email}
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
    const { submissions, isLoading } = this.props;
    if (isLoading) {
      return (
        <div className="ui very padded stacked segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }
    return (
      <div className="ui stacked segments">
        {Object.keys(submissions).map(id => this.renderSubmission(submissions[id]))}
      </div>
    );
  }

}
