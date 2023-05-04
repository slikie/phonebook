const Persons = ({ persons, newSearch, handleDelete }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
        .map(person => <li key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button></li>)
      }
    </ul>
  )
}
export default Persons