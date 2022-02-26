import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({handleInput, value}) => (
  <div>
    <label htmlFor='search'>Find Countries </label>
    <input id='search' onChange={handleInput} value={value} />
  </div>
)

const List = ({countries, handleDetailsButton}) => {
  return countries.map( country => (
    <span key={country.name.common}>{country.name.common}
      <button onClick={() => handleDetailsButton(country.name.common)}>Show details</button><br/>
    </span>
  ))
}

const Details = ({country}) => {
  const capital = country.capital.map(
    (city, index) => index === (country.capital.length - 1) ? city : city + ', '
  )
  
  const languages = []

  for (const language in country.languages) {
    languages.push(<li key={country.languages[language]}>{country.languages[language]}<br/></li>)
  }

  return (
    <>
      <h2>{country.name.common}</h2>
      <span>Capital: {capital}</span><br/>
      <span>Area: {country.area}</span>
      <h3>Languages</h3>
      <ul>{languages}</ul>
      <img src={country.flags.png} alt={'An image of ' + country.name.common + ' flag'}/>
    </>
  )
}

const Display = ({query, handleDetailsButton}) => {
  const [countries, setCountries] = useState([])

  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const results = countries.filter(
    country => country.name.common.toLowerCase().match(query.toLowerCase())
  )

  if (results.length > 10) {
    return 'Too many matches, refine your filter'
  } else if (results.length <= 10 && results.length > 1) {
    return <List handleDetailsButton={handleDetailsButton} countries={results} />
  } else if (results.length === 1) {
    return <Details country={results[0]} />
  } else {
    return 'No matches found'
  }
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchInput = (event) => setSearchQuery(event.target.value)
  const handleShowDetailsButton = (country) => setSearchQuery(country)

  return (
    <div>
      <Search handleInput={handleSearchInput} value={searchQuery} />
      <Display query={searchQuery} handleDetailsButton={handleShowDetailsButton} />
    </div>
  );
}

export default App;
