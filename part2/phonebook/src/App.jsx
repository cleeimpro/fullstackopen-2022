import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => (
    <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
)

const PersonForm = ({
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    addPerson,
}) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const Persons = ({ persons, deletePerson }) => (
    <div>
        {persons.map((p) => (
            <Person key={p.id} person={p} deletePerson={deletePerson} />
        ))}
    </div>
)

const Person = ({ person, deletePerson }) => (
    <div>
        {person.name} {person.number}{' '}
        <button onClick={() => deletePerson(person)}>delete</button>
    </div>
)

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService.getAll().then((persons) => setPersons(persons))
    }, [])

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const addPerson = (e) => {
        e.preventDefault()

        if (persons.find((p) => p.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                const person = persons.find((p) => p.name === newName)
                const changedPerson = { ...person, number: newNumber }
                personService
                    .update(person.id, changedPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((p) =>
                                p.id !== person.id ? p : returnedPerson
                            )
                        )
                        setNewName('')
                        setNewNumber('')
                        setMessage({
                            text: `Updated ${person.name}`,
                            type: 'info',
                        })
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch((err) => {
                        console.log(err)
                        setMessage({
                            text: `Information of ${person.name} has been removed from server`,
                            type: 'error',
                        })
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                        setPersons(persons.filter((p) => p.id !== person.id))
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
            }

            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setMessage({ text: `Added ${newPerson.name}`, type: 'info' })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
        }
    }

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`))
            personService
                .remove(person.id)
                .then(() =>
                    setPersons(persons.filter((p) => p.id !== person.id))
                )
                .catch((err) => {
                    console.log(err)
                    setMessage({
                        text: `Information of ${person.name} has already been removed from server`,
                        type: 'error',
                    })
                    setPersons(persons.filter((p) => p.id !== person.id))
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
    }

    const filteredPersons = persons.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />

            <h2>Numbers</h2>
            <Persons persons={filteredPersons} deletePerson={deletePerson} />
        </div>
    )
}

export default App
