import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'

export default class NoteList extends React.Component{
    constructor() {
        super()
        this.state = {
            notes: []
        }
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm("Are you Sure?")
        if(confirmRemove) {
            axios.delete(`/notes/${id}`, {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(response => {
                console.log(response.data)
                this.setState(prevState => ({
                    notes: prevState.notes.filter(note => note._id !== response.data._id)
                }))
            })
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3015/notes', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const notes = response.data
            this.setState({notes})
        })
    }

    render() {
        return (
            <div>
                <h2>Listing note - { this.state.notes.length }</h2>
                
                <table border="1">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>description</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.notes.map(note => {
                               return (
                                   <tr key={note._id}>
                                       <td>{note._id}</td>
                                       <td>{note.title}</td>
                                       <td>{note.description}</td>
                                      
                                      
                                       <td>
                                           <Link to={`notes/${note._id}`}>Show</Link> ||
                                           <button onClick={() => {
                                               this.handleRemove(note._id)
                                           }}>Remove</button>
                                       </td>
                                    </tr>
                               )
                           }) 
                        }
                    </tbody>
                </table>
                <Link to="/notes/new"> Add Note </Link>
            </div>
        )
    }
}
