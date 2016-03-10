import React, { Component } from 'react';
import moment from 'moment';
import TeacherSection from './smart/TeacherSection';
import StudentSection from './smart/StudentSection';

export default class SubmissionsSingleView extends Component {

    constructor() {
      super();
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
      this.props.fetchSingleExercise(this.props.params.id);
      this.props.fetchSubmissions(this.props.params.id);
    }

    onSubmit(e) {
      e.preventDefault();
      this.props.patchSubmission(
        this.props.submission.id,
        this.refs.textarea.value,
        this.refs.done.checked
      );
    }

    render() {
      const { exercise, submission } = this.props;
      let feedback;

      if (submission.feedback_asked) {
        if (submission.feedback) {
          feedback = (
            <div>
              <h2 className="ui tiny header">Feedback</h2>
              <p>{submission.feedback}</p>
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
              Submission: {exercise.title}
            </h1>
            <div className="ui grid">
              <div className="six wide column">
                <div className="ui segments">
                  <div className="ui secondary segment">
                    <p>Deadline: {moment(exercise.deadline).format('LLL')}</p>
                  </div>
                  <div className="ui segment">
                    <p>{exercise.text}</p>
                  </div>
                </div>
              </div>
              <div className="ten wide column">
                <div className="ui segments">
                  {submission.done ||
                    <StudentSection>
                      <div className="ui attached negative message">
                        <p>Submission is not accepted</p>
                      </div>
                    </StudentSection>
                  }
                  <div className="ui segment">
                    <TeacherSection>
                      <form className="ui form" onSubmit={this.onSubmit}>
                        <div className="field">
                          <label>Feedback</label>
                          <textarea ref="textarea" defaultValue={submission.feedback}></textarea>
                        </div>
                        <div className="inline field">
                          <div className="ui checkbox">
                            <input type="checkbox" ref="done" defaultChecked={submission.done} />
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
