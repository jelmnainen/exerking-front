import React, { Component, PropTypes } from 'react';
import SubmissionsList from './SubmissionsList';
import { FILTER_ALL, FILTER_FEEDBACK }
  from '../constants/submissionsConstants';
import classNames from 'classnames';

export default class SubmissionsPage extends Component {

  constructor() {
    super();
    this.showFeedbackAsked = this.showFeedbackAsked.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentWillMount() {
    this.props.fetchSubmissions();
  }

  showFeedbackAsked() {
    this.props.setFilter(FILTER_FEEDBACK);
  }

  showAll() {
    this.props.setFilter(FILTER_ALL);
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <h1 className="ui large header">
            Submissions
          </h1>
          <div className="ui text menu">
            <div className="header item">Show</div>
            <a
              className={classNames('item', { active: this.props.currentFilter === FILTER_ALL })}
              onClick={this.showAll}
            >
              All
            </a>
            <a
              className={
                classNames('item', { active: this.props.currentFilter === FILTER_FEEDBACK })
              }
              onClick={this.showFeedbackAsked}
            >
              Feedback required
            </a>
          </div>
          <SubmissionsList {...this.props} />
        </div>
      </div>
    );
  }
}

SubmissionsPage.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  submissions: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  fetchSubmissions: PropTypes.func.isRequired,
};
