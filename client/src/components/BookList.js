import React, { useState } from "react";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components'

const getBooks = gql`
    {
        books {
            id,
            name,
            genre,
            author {
                name
            }
        }
    }`

function BookList() {

    const [currentView, setCurrentView] = useState('add');


    const booksData = useQuery(getBooks);
    if (booksData?.loading)
        return null;
    const { books } = booksData.data;

    return (
        <Container>
            {currentView === 'add' ? <div>
                <HeaderContainer>
                    <h1>Add Book</h1>
                    <Button onClick={() => setCurrentView('book')}>See All</Button>
                </HeaderContainer>
                <form>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Book Name</td>
                                <td><Input type="text" required /></td>
                            </tr>
                            <tr>
                                <td>Genre</td>
                                <td><Input type="text" required /></td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td>
                                    <Select defaultValue={""} required>
                                        <option hidden value="">Select Author</option>
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