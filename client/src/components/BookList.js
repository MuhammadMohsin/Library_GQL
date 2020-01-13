import React from "react";
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
        }
    `
function BookList() {

    const booksData = useQuery(getBooks);
    if (booksData?.loading)
        return null;
    const { books } = booksData.data;

    return (
        <>
            <h1>Books</h1>
            <Table>
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
            </Table>
        </>
    )
}

const Table = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    width: 65vw;
    min-width: 500px;
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

export default BookList;