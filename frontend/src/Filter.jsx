const Filter = ({ newSearch, handleSearchChange }) => {
    return (
        <div>
      Filter show with: <input value={newSearch} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter