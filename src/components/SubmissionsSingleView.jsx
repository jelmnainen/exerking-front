import React, { Component } from 'react';
import moment from 'moment';
import TeacherSection from '../containers/TeacherSection';
import StudentSection from '../containers/StudentSection';

export default class SubmissionsSingleView extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchSubmission(this.props.params.id);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.patchSubmission(
      this.props.params.id,
      this.refs.textarea.value,
      this.refs.done.checked
    );
  }

  render() {
    const { exercise, submission } = this.props;
    const loading = !(exercise && submission);

    if (loading) {
      return (
        <div className="row">
          <div className="column">
            <div className="ui active small inline loader" />
          </div>
        </div>
      );
    }

    let feedback;
    if (submission.get('feedback_asked')) {
      if (submission.get('feedback')) {
        feedback = (
          <div>
            <h2 className="ui tiny header">Feedback</h2>
            <p>{submission.get('feedback')}</p>
          </div>
        );
      } else {
        feedback = (
          <p>No feedback given</p>
        );
      }
    } else {
      feedback = (
        <p>No feedback requested.</p>
      );
    }

    return (
      <div className="row">
        <div className="column">
          <h1 className="ui large header">
            Submission: {exercise.get('title')}
          </h1>
          <div className="ui grid">
            <div className="six wide column">
              <div className="ui segments">
                <div className="ui secondary segment">
                  <p>Deadline: {moment(exercise.get('deadline')).format('LLL')}</p>
                </div>
                <div className="ui segment">
                  <p>{exercise.get('text')}</p>
                </div>
              </div>
            </div>
            <div className="ten wide column">
              <div className="ui segments">
                {submission.get('done') ||
                  <StudentSection>
                    <div className="ui attached negative message">
                      <p>Submission is not accepted</p>
                    </div>
                  </StudentSection>
                }
                {submission.get('file_url') &&
                  <div className="ui attached info message">
                    File attachment available.
                    <a
                      href={submission.get('file_url')}
                      target="_blank"
                      className="compact blue basic mini ui right floated button"
                    >
                      Download file
                    </a>
                  </div>
                }
                <div className="ui segment">
                  <TeacherSection>
                    <form className="ui form" onSubmit={this.onSubmit}>
                      <div className="field">
                        <label>Feedback</label>
                        <textarea
                          ref="textarea"
                          defaultValue={submission.get('feedback')}
                        />
                      </div>
                      <div className="inline field">
                        <div className="ui checkbox">
                          <input
                            type="checkbox"
                            ref="done"
                            defaultChecked={submission.get('done')}
                          />
                          <label>Done</label>
                        </div>
                      </div>
                      <button className="ui primary button">
                        Save
                      </button>
                    </form>
                  </TeacherSection>
                  <StudentSection>
                    {feedback}
                  </StudentSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
