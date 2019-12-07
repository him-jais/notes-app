import React from 'react'
import axios from 'axios'
import CategoryForm from './categoryForm'

class CategoryNew extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('http://localhost:3015/categories', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(reponse => {
            //console.log(reponse.data)
            if(reponse.data.hasOwnProperty('errors')) {
                alert(reponse.data.message)
            } else {
                this.props.history.push('/categories')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Add Category</h2>
                <CategoryForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default CategoryNew