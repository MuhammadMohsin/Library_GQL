import React from 'react';
import styled from 'styled-components';

const BookList = ({ books, setCurrentView }) => {
    return (
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

    )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
export default BookList;