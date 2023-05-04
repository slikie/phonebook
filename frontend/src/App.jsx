import { useState, useEffect } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import phonebookService from './services/phonebookService'
import notif from './Notification'







const App = () => {


    const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 }])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [infoMessage, setInfoMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const sendInfoNotif = (infomsg, timeout) => {

        setInfoMessage(infomsg)
        setTimeout(() => {
            setInfoMessage('')
        }, timeout)
    }
    const sendErrorNotif = (errormsg, timeout) => {

        setErrorMessage(errormsg)
        setTimeout(() => {
            setErrorMessage('')
        }, timeout)
    }

    const loadingHook = () => {
        phonebookService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }

    useEffect(loadingHook, [])

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleNameSubmit = (event) => {
        event.preventDefault()
        const personExists = persons.find(person => person.name === newName)
        if (personExists) {
            const confirmed = window.confirm(
                `${newName} is already added to the phonebook, replace the old number with a new one?`
            )
            if (confirmed) {
                const updatedPerson = { ...personExists, number: newNumber }
                phonebookService.update(updatedPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
                        sendInfoNotif(`'${updatedPerson.name}' number changed `, 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(() => {
                        console.log('fail')
                        sendErrorNotif(`'${updatedPerson.name}' already deleted`, 5000)
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            phonebookService.create(newPerson).then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                sendInfoNotif(`Added '${returnedPerson.name}' `, 5000)
            })
                .catch(error => {
                    // this is the way to access the error message
                    console.log(error.response.data.error)
                    sendErrorNotif(error.response.data.error, 5000)
                })
        }
    }

    const handleDelete = (id) => {
        const personToDelete = persons.find(person => person.id === id)

        const confirmed = window.confirm(`Delete ${personToDelete.name}?`)
        if (confirmed) {
            phonebookService.delete(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    sendInfoNotif(`Deleted '${personToDelete.name}' `, 5000)
                })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <notif.Notification message={infoMessage} />
            <notif.Error message={errorMessage} />
            <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

            <h2>Add a new</h2>
            <PersonForm handleNameSubmit={handleNameSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>
            <Persons persons={persons} newSearch={newSearch} handleDelete={handleDelete} />
        </div>
    )
}

export default App
