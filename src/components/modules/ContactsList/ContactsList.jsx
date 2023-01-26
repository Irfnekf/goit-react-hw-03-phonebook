import PropTypes from 'prop-types';
import css from './contactsList.module.css';

const ContactsList = ({ removeContact, contacts }) => {
  const item = contacts.map(({ id, name, number }) => (
    <li className={css.contactItem} key={id}>
      {name}: {number}
      <button
        className={css.deleteButton}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ol>{item}</ol>;
};

ContactsList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsList;
