import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SubmissionsList extends Component {


  renderSubmission(submission) {
    return (
      <ul>
        <li key={submission.id}>
          <h1><Link to ={`/submissions/${submission.id}`}>Submission: {submission.id}</Link></h1>
          <p>User: {submission.user_id}</p>
          <p>Exercise: {submission.exercise_id}</p>
          <p>Feedback asked: {submission.feedback_asked ? 'Yes' : 'No' }</p>
          <p>Points awarded: {submission.done ? 'Yes' : 'No' }</p>
          <p>Submitted at: {submission.created_at}</p>
        </li>
      </ul>
    );
  }

  render() {
    const { submissions } = this.props;
    return (
      <div>
        {Object.keys(submissions).map(id => this.renderSubmission(submissions[id]))}
      </div>
    );
  }

}
