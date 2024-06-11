import {useState, useEffect} from 'react'

const Country=()=>{
    const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => { setCountries(data)
        // setSelectedState('');
        // setSelectedCity('');
      }).catch((err)=>{
      console.log("error in 1st-",err);
      })
    
  }, []);
 // console.log(countries);

  useEffect(() => {
    if (selectedCountry ) {
      
        console.log("selectedCountry===>",selectedCountry);
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => {
          setStates(data)
          setSelectedState("");
          setCities([]);  
          setSelectedCity("");
        })      
      
      .catch((err)=>{
        console.log("error  in 2nd-",err);
      })
      
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState ) {

      
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => {setCities(data)   
          setSelectedCity("");
          } )
        
        .catch((err )=>{
          console.log("error in 3rd-",err)
        })
       
    }
  }, [selectedCountry, selectedState]);

  // const handleCountryChange = e => {
  //   console.log(e.target.value);
  //   setSelectedCountry(e.target.value);
  //   setSelectedState('');
  // };

  // const handleStateChange = e => {
  //   setSelectedState(e.target.value);
  // };
    
  return(
  <div>
  <div>
    <h1>Select Location</h1>
  </div>

<select value={selectedCountry}  onChange={(e)=>setSelectedCountry(e.target.value)}>
        <option value=""
       >Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select value={selectedState} 
        onChange={(e)=>setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="" disabled>Select State</option>
        {states.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select 
        value={selectedCity}
        onChange={(e)=>setSelectedCity(e.target.value)}
        disabled={!selectedState}>
        <option value="" disabled>Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCountry && selectedCity && selectedState ?
       <div>
          <p>You selected {selectedCity}, {selectedState}, {selectedCountry} </p>
      </div>
      :<></>}
  </div>
  );
}

export default Country;