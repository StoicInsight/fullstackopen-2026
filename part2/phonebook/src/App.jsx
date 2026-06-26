import { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import People from './People';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  const addPerson = async (event, name, number) => {
    event.preventDefault();

    const newPerson = { name: name, number: number };
    const checkName = persons.find((person) => person.name === newPerson.name);

    if (checkName === undefined) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newPerson.name} is already added to the phonebook`);
    }
  };

  const filterNames = (name) => {
    const filtered = persons.filter((person) => {
      return person.name.includes(name);
    });
    setFilteredPeople(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter people={persons} filterNames={filterNames} />
      <h2>Add a new Number</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>

      <People filteredPeople={filteredPeople} persons={persons} />
    </div>
  );
};

export default App;
