import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import People from './People';
import phoneService from './services/phone.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    phoneService.getAll().then((res) => setPersons(res));
    // setPersons(getPhones);
  }, []);

  const addPerson = async (event, name, number) => {
    event.preventDefault();

    const newPerson = {
      name: name,
      number: number,
      // id: String(persons.length + 2),
    };
    console.log('New person', newPerson);
    const checkName = persons.find((person) => person.name === newPerson.name);
    const checkPhone = persons.find(
      (person) => person.number === newPerson.number,
    );

    if (checkName && checkPhone === undefined) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const phone = persons.find((person) => person.name === newPerson.name);
        const updatedPhone = { ...phone, number: newPerson.number };
        console.log('Checking phone', phone);
        await phoneService.updatePhone(updatedPhone);
      }
    }

    if (checkName === undefined) {
      phoneService.addPhone(newPerson);
      setPersons(persons.concat(newPerson));
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
    } else return;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter people={persons} filterNames={filterNames} />
      <h2>Add a new Number</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>

      <People persons={persons} deleteNumber={deleteNumber} />
    </div>
  );
};

export default App;
