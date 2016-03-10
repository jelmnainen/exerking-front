import React, { Component } from 'react';
import moment from 'moment';

export default class SubmissionsSingleView extends Component {

    constructor() {
      super();
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
      this.props.fetchSingleExercise(this.props.params.id);
      this.props.fetchSubmissions(this.props.params.id);
    }

    componentDidMount() {
      if (this.props.submission.feedback !== null) {
        this.refs.textarea.value = this.props.submission.feedback;
      }
    }

    onSubmit(e) {
      e.preventDefault();
      console.log('PATCHÖÖÖ');
      this.props.patchSubmission(this.props.submission.id, this.refs.textarea.value);
    }

    render() {
      const { exercise } = this.props;
      return (
        <div className="row">
          <div className="column">
            <h1 className="ui large header">{exercise.title}</h1>
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
                  <div className="ui segment">
                    <div className="ui form">
                      <div className="field">
                        <form onSubmit={this.onSubmit}>
                          <label>Feedback</label>
                          <textarea ref="textarea"></textarea>
                          <button className="ui primary button">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
