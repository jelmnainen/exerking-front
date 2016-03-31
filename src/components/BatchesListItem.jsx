import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import TeacherSection from '../containers/TeacherSection';
import DeadlineLabel from './DeadlineLabel';
import ExercisesList from './ExercisesList';

export default class BatchesListItem extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    const batch = this.props.batch;
    if (this.isDeletable()) {
      if (window.confirm(`You are about to delete set "${batch.get('title')}"`)) {
        this.props.onDeleteClick(this.props.batch.get('id'));
      }
    }
  }

  isDeletable() {
    return this.props.exercises.isEmpty();
  }

  render() {
    const { exercises, batch, categories } = this.props;
    const deletable = this.isDeletable();
    return (
      <div className="row">
        <div className="column">
          <h2 className="ui medium header">
            {batch.get('title')}
            {' '}
            <TeacherSection>
              <button
                className={cn(
                  'ui tiny red basic button compact right floated',
                  { disabled: !deletable }
                )}
                onClick={this.onDeleteClick}
              >
                <i className ="remove icon"></i>
                Delete set
              </button>
            </TeacherSection>
            <DeadlineLabel deadline={batch.get('deadline')} />
          </h2>
          <ExercisesList
            exercises={exercises}
            categories={categories}
          />
        </div>
      </div>
    );
  }
}

BatchesListItem.propTypes = {
  batch: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  exercises: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
};
