import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({handleInput, value}) => (
  <div>
    <label htmlFor='search'>Find Countries </label>
    <input id='search' onChange={handleInput} value={value} />
  </div>
)

const Display = ({query}) => {
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
    return results.map( country => (
      <span key={country.name.common}>{country.name.common}<br/></span>
    ))
  } else if (results.length === 1) {
    const result = results[0]
    const capital = result.capital.map(
      (city, index) => index === (result.capital.length - 1) ? city : city + ', '
    )
    
    const languages = []

    for (const language in result.languages) {
      languages.push(<li key={result.languages[language]}>{result.languages[language]}<br/></li>)
    }

    return (
      <>
        <h2>{result.name.common}</h2>
        <span>Capital: {capital}</span><br/>
        <span>Area: {result.area}</span>
        <h3>Languages</h3>
        <ul>{languages}</ul>
        <img src={result.flags.png} alt={'An image of ' + result.name.common + ' flag'}/>
      </>
    )
  } else {
    return 'No matches found'
  }
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchInput = (event) => setSearchQuery(event.target.value)

  return (
    <div>
      <Search handleInput={handleSearchInput} value={searchQuery} />
      <Display query={searchQuery} />
    </div>
  );
}

export default App;
