import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faLocationDot, faEarthAmericas, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { faCloud, faSun } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [result,setresult] = useState(null)
  const [cityInput, setCityInput] = useState('Chennai');
  const [data,setdata] = useState(null)
  const [city,setcity] = useState('Chennai')
  const [errorMessage, setErrorMessage] = useState('');
  
  
    const fetchdata = async()=>{

      if (!city) {
        // If city is empty, return without making the API call
        return;
      }
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&days=1`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'b559bb3588msh432bec28659a201p18afdfjsnd8ddeba8732d',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            // Throw error if response status is not ok
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data1 = await response.text();
          //console.log(data1);
          setdata(data1)
          const data = JSON.parse(data1);
          setresult(data); 
          setErrorMessage('');
          //console.log(data);
        } catch (error) {
          console.error(error);
          if (error.message.includes('400')) {
            // Display specific message for bad request
            setErrorMessage('Enter the city name correctly');
          } else {
            // Display general error message for other errors
            setErrorMessage('An error occurred');
          }
          setdata(null)
          setresult(null)
        }
        
      }
      useEffect(()=>{
        fetchdata()
      },[city])
      
      const buttonPressed = () => {
        setcity(cityInput);
      };
      return(
        <div className='container'>
          
          <Container style={{display:'inline-flex',width:'auto', margin:'30px',padding:'30px',alignItems:'center',justifyContent:'center' }} className='main'>
            <div className='text'>
              <TextField
                id="outlined-basic"
                className='city-input'
                label="Enter The City Name"
                variant="outlined"
                onChange={(e) => setCityInput(e.target.value)}
                style={{ backgroundColor:'#bef1f1'}}
              />
              <Button variant="contained" className='submit' onClick={buttonPressed} >Submit</Button>
            </div>
            {result && ( // Conditional rendering
            <div className='details'>
              <Typography variant="h4" style={{ marginTop: '20px',marginBottom: '20px' }}>Weather Information &nbsp;  <FontAwesomeIcon icon={faCloud} /></Typography>
              <Typography variant="body1"><FontAwesomeIcon icon={faLocationDot} />&nbsp; Location: <h4>{result.location.name}</h4></Typography>
              <Typography variant="body1">State: {result.location.region}</Typography>
              <Typography variant="body1"><FontAwesomeIcon icon={faEarthAmericas} />&nbsp; Country: <h4>{result.location.country}</h4></Typography>
              <Typography variant="body1"><FontAwesomeIcon icon={faTemperatureThreeQuarters} />&nbsp; Temperature : <h4>{result.current.temp_c} °C / {result.current.temp_f} °F</h4></Typography>
              <Typography variant="body1"><FontAwesomeIcon icon={faSun} />&nbsp; Climate: <h4>{result.current.condition.text}</h4></Typography>
              <Typography variant="h6" color="error">{errorMessage}</Typography>
            </div>
            )}
          
          </Container>
    </div>
      )
  
}

export default App;
