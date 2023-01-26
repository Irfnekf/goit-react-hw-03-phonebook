import PropTypes from 'prop-types';
import css from './contactsFilter.module.css';
import { Component } from 'react';

class ContactsFilter extends Component {
  render() {
    const { handleChange, filter } = this.props;

    return (
      <div className={css.searchWrapper}>
        <label className={css.label}> Find contacts by name</label>
        <input
          value={filter}
          className={css.filterInput}
          name="filter"
          onChange={handleChange}
        />
      </div>
    );
  }
}

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default ContactsFilter;
