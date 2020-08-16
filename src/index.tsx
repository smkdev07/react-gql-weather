import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import './index.css';

import App from './App';

const client = new ApolloClient({
  uri: 'https://graphql-weather-api.herokuapp.com/',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
