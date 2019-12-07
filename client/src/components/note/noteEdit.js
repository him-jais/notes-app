import React from 'react'
import axios from 'axios'
import NoteForm from './noteForm'

class NoteEdit extends React.Component {
    constructor(){
        super()
        this.state={
            note:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/notes/${id}`, {
            headers: {
                'x-auth' :localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            this.setState({note})
        })
    }
    handleSubmit(formData){
        const id= this.props.match.params.id
        axios.put(`http://localhost:3015/notes/${id}`, 
        formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push(`/notes/${response.data._id}`)
            }
        })
    }
    render() {
        return (
            <div>
                <h2>Edit Note</h2>
                {Object.keys(this.state.note).length !==0 && <NoteForm  note={this.state.note} handleSubmit ={this.handleSubmit}  /> }
                   
                </div>
        )
    }
}

export default NoteEdit