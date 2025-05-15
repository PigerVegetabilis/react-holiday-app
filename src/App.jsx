import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [holidays, setHolidays] = useState([]);
  const [country, setCountry] = useState('');
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    fetch('https://openholidaysapi.org/countries')
      .then(res => res.json())
      .then(data => {
        const formattedCountries = (data.map((country) => ({
          name: country.name[0].text,
          key: country.isoCode})));
        setCountryList(formattedCountries);
        const defaultCountry = formattedCountries.find(c => c.key === 'NL');
        if (defaultCountry) {
          setCountry(defaultCountry.name);
          setHolidayList(defaultCountry.key);
        }
        });
    }, []);
  function setHolidayList(key){
    fetch(`https://openholidaysapi.org/publicholidays?countryIsoCode=${key}&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=EN`)
    .then(res => res.json())
    .then(data => {
      const formattedHolidays = (data.map((holiday) =>({
        name: holiday.name[0].text,
        date: holiday.startDate
      })));
      setHolidays(formattedHolidays);
    });
    
  }
  return (
    <>
      <select 
        name="" 
        id=""
        value = {country} 
        onChange={(e) => {setCountry(e.target.value); setHolidayList(countryList.find(c => c.name === e.target.value)?.key)}}
        >
        {countryList.map((country) =>
          <option key={country.key}>{country.name}</option>
        )}
      </select>
      
      <ul>
        {holidays.map((holiday, index) =>
          <li key = {index}>{new Date(holiday.date).toLocaleString('en-US', {
            month: 'long',   
            day: 'numeric'
          })} - <span className="holiday-name">{holiday.name}</span>
          </li>
        )}
      </ul>

      
    </>
  )
}

export default App
