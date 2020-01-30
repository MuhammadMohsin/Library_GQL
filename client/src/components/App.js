import React, { useState } from "react";
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import AddBook from './AddBook';
import BookList from './BookList';
import styled from 'styled-components';
const serialize = require('form-serialize');


const getDetails = gql`
    {
        books {
            id,
            name,
            genre,
            author {
                name,
                id
            }
        },
        authors {
            id,
            name,
            age
        }
    }`
const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: String!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
        id,
        genre,
        authorId
      }
    }
  `;

const App = () => {

    const [currentView, setCurrentView] = useState('book');
    const [addBook] = useMutation(addBookMutation);

    const response = useQuery(getDetails);
    if (response?.loading)
        return null;
    const { books, authors } = response.data;

    const handleSubmit = (e) => {
        e.preventDefault();
        var bookObj = serialize(e.target, { hash: true });
        addBook({
            variables: {
                name: bookObj.name,
                genre: bookObj.genre,
                authorId: bookObj.authorId
            },
            refetchQueries: [{ query: getDetails }]
        });
        setCurrentView('book');
    }

    return (
        <Container>
            {currentView === 'add' ?
                <AddBook
                    authors={authors}
                    setCurrentView={setCurrentView}
                    handleSubmit={handleSubmit}
                /> :
                <BookList
                    books={books}
                    setCurrentView={setCurrentView}
                />
            }
        </Container>
    )
}

const Container = styled.div`
    width: 60vw;
    min-width: 500px;
    margin: 0 auto;
`
export default App;