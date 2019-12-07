import React from 'react'
import axios from 'axios'
import NoteForm from './noteForm'

class NoteNew extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('http://localhost:3015/notes', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(reponse => {
            //console.log(reponse.data)
            if(reponse.data.hasOwnProperty('errors')) {
                alert(reponse.data.message)
            } else {
                this.props.history.push('/notes')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Add Notes</h2>
                <NoteForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default NoteNew