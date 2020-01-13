import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BookList from './components/BookList';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './config';

ReactDOM.render(
    <ApolloProvider client={client}>
        <BookList />
    </ApolloProvider>,
    document.getElementById('root'));
