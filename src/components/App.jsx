import { Component } from 'react';
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  handleSubmit = ({ name, number }) => {
    const normalisedName = name.toLowerCase();
    const isInContacts = this.state.contacts.find(contact => contact.name.toLowerCase() === normalisedName);

    if (isInContacts) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = {
        name: name,
        number: number,
        id: nanoid(),
      };

      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts]
      }));
    };
  }

  handleFilterChange = (newValue) => {
    this.setState({ filter: newValue });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalisedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const contacts = this.filteredContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={ this.handleSubmit } />
        <h2 className={styles.title}>Contacts</h2>
        <Filter currentValue={filter} onChange={ this.handleFilterChange } />
        <ContactList contacts={contacts} deleteContact={ this.deleteContact }/>
      </div>
    )
  }
};

export default App;

