import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './phonebook.module.css';

import ContactsForm from '../ContactsForm/ContactsForm';
import ContactsList from '../ContactsList/ContactsList';
import ContactsFilter from '../ContactsFilter/ContactsFilter';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }
  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }
    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
    return true;
  };
  getFilteredContacts() {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  }

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;

    const contactDubl = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(contactDubl);
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const { filter } = this.state;
    const { addContact, removeContact, handleFilter } = this;
    const contactsFilter = this.getFilteredContacts();
    const isContact = Boolean(contactsFilter.length);
    return (
      <>
        <div className={css.con}>
          <div className={css.container}>
            <header className={css.header}>
              <h1 className={css.title}>Phonebook</h1>
              <ContactsForm onSubmit={addContact} />
            </header>
            <div className={css.contact_library}>
              <h2 className={css.title}>Contacts</h2>

              <ContactsFilter handleChange={handleFilter} filter={filter} />
              {isContact && (
                <ContactsList
                  removeContact={removeContact}
                  contacts={contactsFilter}
                />
              )}
              {!isContact && <p>No contacts in list</p>}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Phonebook;
