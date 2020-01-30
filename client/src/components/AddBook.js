import React from 'react';
import styled from 'styled-components';

const AddBook = ({ authors, setCurrentView, handleSubmit }) => {
    return (
        <div>
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
        </div>
    )
}

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

export default AddBook;