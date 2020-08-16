import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { City } from '../models/City';

interface WeatherCardProps {
  cityData: City;
  saved: boolean;
  buttonClickHandler: (city: City, saved: boolean) => void;
}

const useStyles = makeStyles({
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.20)',
    padding: '1rem 0.5rem',
    width: '275px',
  },
  sectionTitle: {
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 0 0.25rem 0',
    width: '100%',
  },
  mainTemperatureText: {
    color: '#2c3e50',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feelsLikeText: {
    color: '#7f8c8d',
    fontSize: '1.2rem',
  },
  sectionDescription: {
    color: '#2c3e50',
    fontSize: '1rem',
    textAlign: 'center',
    letterSpacing: '1px',
    textTransform: 'capitalize',
  },
  sectionTemperatures: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 0 1rem 0',
    width: '100%',
  },
  subSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  temperatureText: {
    color: '#7f8c8d',
    fontSize: '1.4rem',
  },
  labelLowText: {
    color: '#3498db',
    fontSize: '1.2rem',
  },
  labelHighText: {
    color: '#e74c3c',
    fontSize: '1.2rem',
  },
  sectionTime: {
    color: '#2c3e50',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  sectionPinButton: {
    margin: '0.5rem auto 0 auto',
  },
  buttonPin: (props: WeatherCardProps) => {
    return {
      color: '#ecf0f1',
      fontFamily: 'inherit',
      fontSize: '1rem',
      backgroundColor: props.saved ? '#e74c3c' : '#2ecc71',
      border: 'none',
      borderRadius: '4px',
      outline: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      width: '100px',
      transform: 'transform 200ms ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    };
  },
});

const WeatherCard = (props: WeatherCardProps) => {
  const classes = useStyles(props);
  const { name, country, weather } = props.cityData;
  return (
    <div className={classes.container}>
      <div className={classes.sectionTitle}>
        {name}, {country}
      </div>
      <div className={classes.sectionMain}>
        <img
          src={`http://openweathermap.org/img/w/${weather.summary.icon}.png`}
          alt={weather.summary.title}
          style={{ height: 75, width: 75 }}
        />
        <div className={classes.subSection}>
          <p className={classes.mainTemperatureText}>
            {weather.temperature.actual}°
          </p>
          <p className={classes.feelsLikeText}>
            Feels Like: {weather.temperature.feelsLike}°
          </p>
        </div>
      </div>
      <div className={classes.sectionDescription}>
        {weather.summary.description}
      </div>
      <div className={classes.sectionTemperatures}>
        <div className={classes.subSection}>
          <p className={classes.temperatureText}>{weather.temperature.min}°</p>
          <p className={classes.labelLowText}>Low</p>
        </div>
        <div className={classes.subSection}>
          <p className={classes.temperatureText}>{weather.temperature.max}°</p>
          <p className={classes.labelHighText}>High</p>
        </div>
      </div>
      <div className={classes.sectionTime}>
        Last Updated: {new Date(weather.timestamp * 1000).toLocaleString()}
      </div>
      <div className={classes.sectionPinButton}>
        <button
          onClick={() => props.buttonClickHandler(props.cityData, props.saved)}
          className={classes.buttonPin}
        >
          {props.saved ? 'Remove' : 'Pin'}
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
