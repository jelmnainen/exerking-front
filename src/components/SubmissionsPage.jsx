import React, { Component } from 'react';
import SubmissionsList from './SubmissionsList';

export default class SubmissionsPage extends Component {

  componentWillMount() {
    this.props.fetchAllSubmissions();
    this.props.fetchExercises();
    this.props.fetchAllUsers();
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h1 className="ui large header">
            Submissions
          </h1>
          <SubmissionsList {...this.props}/>
        </div>
      </div>
    );
  }
}