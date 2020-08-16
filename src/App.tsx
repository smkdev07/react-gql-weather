import React, { useState, useRef, useReducer, ChangeEvent } from 'react';

import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';

import './App.css';

import { City } from './models/City';
import { reducer } from './store/reducer';
import { ACTION_TYPES } from './store/action-types';
import WeatherCard from './components/WeatherCard';

const WEATHER = gql`
  query WithCityName($cityName: String!) {
    getCityByName(name: $cityName, config: { units: imperial, lang: en }) {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    width: '100%',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputLabel: {
    color: '#2c3e50',
    fontSize: '0.8rem',
  },
  inputField: {
    color: '#2c3e50',
    fontFamily: 'inherit',
    fontSize: '1.5rem',
    border: 'none',
    borderBottom: '2px solid #7f8c8d',
    outline: 'none',
    padding: '0.12rem 1rem',
    width: '300px',
    '&:focus': {
      borderBottom: '2px solid #2c3e50',
    },
  },
  citiesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    justifyContent: 'center',
    alignItems: 'center',
    placeItems: 'center',
    rowGap: '2rem',
    backgroundColor: '#fff',
    marginTop: '1rem',
    padding: '1rem ',
    width: '100%',
  },
});

const App = () => {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const [cities, dispatch] = useReducer(reducer, []);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { loading, error, data } = useQuery(WEATHER, {
    variables: { cityName: city },
    skip: city.length === 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCitySearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const timeout = setTimeout(() => {
      setCity((prevState) => event.target.value);
    }, 500);

    timeoutRef.current = timeout;
  };

  const handleButtonClick = (city: City, saved: boolean) => {
    if (saved) {
      dispatch({ type: ACTION_TYPES.REMOVE_CITY, payload: city });
    } else {
      dispatch({ type: ACTION_TYPES.ADD_CITY, payload: city });
    }

    setCity((prevState) => '');
    inputRef.current!.value = '';
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.title}>What is the weather like in...</div>
      <div className={classes.inputContainer}>
        <label htmlFor="city" className={classes.inputLabel}>
          Enter City
        </label>
        <input
          type="text"
          id="city"
          autoComplete="off"
          ref={inputRef}
          onChange={handleCitySearch}
          className={classes.inputField}
        />
      </div>
      <div className={classes.citiesContainer}>
        {data?.getCityByName ? (
          <WeatherCard
            cityData={data.getCityByName}
            saved={false}
            buttonClickHandler={handleButtonClick}
          />
        ) : null}
        {cities.map((city) => (
          <WeatherCard
            cityData={city}
            saved={true}
            buttonClickHandler={handleButtonClick}
            key={city.id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
