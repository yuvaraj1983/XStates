import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {

    const getCountries = async () => {
      const url = `https://crio-location-selector.onrender.com/countries`;
      axios.get(url).then((response) => {
        setCountries(response.data)
      })
      .catch((err) => console.log(err));
      
    }
    getCountries();
  },[])

  useEffect(() => {
    if(selectedCountry) {
      console.log("selectedCountry", selectedCountry)
      const url=`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      console.log("url", url);
      axios.get(url).then((response) => {
        setStates(response.data);
        setSelectedState("");
        setSelectedCity("");
        
      })
      .catch((err) => {
        console.log(err);
      })
    }
   

  },[selectedCountry])

  useEffect(() => {
    const url = ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`

    if(selectedState) {
      axios.get(url)
      .then((response) => {
        setCities(response.data)
        setSelectedCity("");
      })
      .catch((err) => {
        console.log(err);
      })
    }
  
  },[selectedState])
  return (
    <div className="App">
      <h1>Select Location</h1>
      <div  style={{textAlign:'center', display:'flex',justifyContent:'center'}}>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {
              countries && countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))
          }
        </select>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {
            states && states.map((state) => (
              <option key={state} value={state}>{state}</option>
            )) 
          }
        </select>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Select City</option>
          {
            cities && cities.map((city) => (
                <option key={city} value={city}>{city}</option>
            ))
          }
        </select>
      </div>
          {
            selectedCity && 
            <h1>You selected {selectedCountry}, <span style={{fontSize:'20px', color:"grey"}}>{selectedState}, {selectedCity} </span> </h1>
          }
    </div>
  );
}

export default App;
