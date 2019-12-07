import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//import config from '../config/axios'


class NoteShow extends React.Component {
    constructor() {
        super()
        this.state = {
            note : {}
        }
    }

    handleRemove = () => {
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove) {
            axios.delete(`/notes/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(reponse => {
                this.props.history.push('/notes')
            })
        }   
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/notes/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(reponse => {
            const note = reponse.data
            //console.log(customer)
            this.setState({ note})
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <h2>Note Show Page</h2>
                <p>
                    {this.state.note.title},<br/>
                    {this.state.note.description},<br/>
                   
                </p>
                <Link to={`/notes/edit/${this.state.note._id}`}>edit</Link>
                <button onClick={this.handleRemove}>Delete</button> ||
                <Link to="/notes">Back</Link>
            </div>
        )
    }
}

export default NoteShow