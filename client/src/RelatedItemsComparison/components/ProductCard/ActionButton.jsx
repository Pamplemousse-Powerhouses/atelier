import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../../../components/Icons';

export default function ActionButton({
  id,
  name,
  handleRemoveItemClick,
  symbol,
  handleStarClick,
  handleMouseEnter,
  handleMouseLeave,
}) {
  if (symbol === 'EmptyStar') {
    return (
      <Icons.EmptyStar
        onClick={() => handleStarClick(id, name)}
        onKeyPress={() => handleStarClick(id, name)}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        role="button"
        tabIndex="0"
        className="action-button"
      />
    );
  }

  if (symbol === 'Exit') {
    return (
      <Icons.Exit
        onClick={() => handleRemoveItemClick(id)}
        onKeyPress={() => handleRemoveItemClick(id)}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        role="button"
        tabIndex="0"
        className="action-button"
      />
    );
  }
}

ActionButton.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleRemoveItemClick: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  handleStarClick: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
};
