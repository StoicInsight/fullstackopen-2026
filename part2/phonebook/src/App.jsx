import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import People from './People';
import phoneService from './services/phone.js';
import Notification from './Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [notification, SetNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    phoneService.getAll().then((res) => setPersons(res));
    // setPersons(getPhones);
  }, []);

  const changeNotification = (message, type) => {
    SetNotification({ message: message, type: type });

    setTimeout(() => {
      SetNotification('');
    }, 3000);
  };

  const addPerson = async (event, name, number) => {
    event.preventDefault();

    const newPerson = {
      name: name,
      number: number,
    };
    const checkName = persons.find((person) => person.name === newPerson.name);
    const checkPhone = persons.find(
      (person) => person.number === newPerson.number,
    );

    if (checkName && !checkPhone) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const phone = persons.find((person) => person.name === newPerson.name);
        const updatedPhone = { ...phone, number: newPerson.number };
        const updatedPerson = await phoneService.updatePhone(updatedPhone);
        setPersons(persons.concat(updatedPerson));
      }
    }

    if (checkName === undefined) {
      phoneService.addPhone(newPerson);
      setPersons(persons.concat(newPerson));
      changeNotification(`Added ${newPerson.name}`, 'success');
    }
  };

  const filterNames = (name) => {
    const filtered = persons.filter((person) => {
      return person.name.includes(name);
    });
    setFilteredPeople(filtered);
  };

  const deleteNumber = async (people) => {
    if (window.confirm(`Delete ${people.name} ?`)) {
      phoneService
        .removePhone(people.id)
        .then((data) =>
          setPersons(persons.filter((person) => person.id != data.id)),
        );
      changeNotification(`Removed ${people.name} from database`, 'success');
    } else return;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Filter people={persons} filterNames={filterNames} />
      <h2>Add a new Number</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>

      <People persons={persons} deleteNumber={deleteNumber} />
    </div>
  );
};

export default App;
