import React, { useState } from "react";
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
var serialize = require('form-serialize');

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

function BookList() {

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
            {currentView === 'add' ? <div>
                <HeaderContainer>
                    <h1>Add Book</h1>
                    <Button onClick={() => setCurrentView('book')}>See All</Button>
                </HeaderContainer>
                <form onSubmit={handleSubmit}>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Book Name</td>
                                <td><Input type="text" required name="name" /></td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td><Input type="text" required name="genre" /></td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td>
                                    <Select defaultValue={""} required name="authorId">
                                        <option hidden value="">Select Author</option>
                                        {authors.map(author =>
                                            <option key={author.id} value={author.id}>{author.name}</option>
                                        )}
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    <Submit>Submit</Submit>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </div> :
                <div>
                    <HeaderContainer>
                        <h1>Books</h1>
                        <Button onClick={() => setCurrentView('add')}>Add Book</Button>
                    </HeaderContainer>
                    <BooksTable>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Genre</th>
                                <th>Author</th>
                            </tr>
                        </thead>
                        {!(books && books.length) ? (
                            <tbody>
                                <tr>
                                    <td colSpan="3">
                                        <h3 align="center">No Book Available!</h3>
                                    </td>
                                </tr>
                            </tbody>
                        ) :
                            <tbody>
                                {books.map(book => {
                                    return (
                                        <tr key={book.id} className="book-info">
                                            <td>{book.name || '-'} </td>
                                            <td>{book.genre || '-'}</td>
                                            <td>{book.author?.name || '-'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        }
                    </BooksTable>
                </div>
            }
        </Container>
    )
}

const Container = styled.div`
    width: 60vw;
    min-width: 500px;
    margin: 0 auto;
`
const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Table = styled.table`
    width: 100%;
    box-shadow: 0px 1px 12px black;
    padding: 10px;
`
const BooksTable = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    width: 100%;
    thead {
        background-color: #901e1e;
        color: white;
        text-transform: uppercase;
    }
    td,th {
        padding: 10px;
        border: 1px solid black;
    }
    tr.book-info:hover{
        background-color: #d8d8d8;
    }
`
const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 1px solid #901e1e;
    color: #901e1e;
    color: #901e1e;
    padding: 0.5em 3em;
    height: 42px;
    cursor: pointer;
`
const Submit = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 1px solid #901e1e;
    color: #901e1e;
    color: #901e1e;
    padding: 0.5em 3em;
    height: 35px;
    width: 275px;
    width: 97%;
    margin: 0.5em;
 `
const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    border: 1px solid gray;
    border-radius: 3px;
    width: 94%;
`;
const Select = styled.select`
    padding: 0.5em;
    width: 97%;
    margin: 0.5em;
`;

export default BookList;