import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//import config from '../config/axios'


class CategoryShow extends React.Component {
    constructor() {
        super()
        this.state = {
            category : {}
        }
    }

    handleRemove = () => {
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove) {
            axios.delete(`/categories/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(reponse => {
                this.props.history.push('/categories')
            })
        }   
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/categories/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(reponse => {
            const category = reponse.data
            //console.log(customer)
            this.setState({ category})
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <h2>Category Show Page</h2>
                <p>
                    {this.state.category.name},<br/>
                   
                </p>
                <Link to={`/categories/edit/${this.state.category._id}`}>edit</Link>
                <button onClick={this.handleRemove}>Delete</button> ||
                <Link to="/categories">Back</Link>
            </div>
        )
    }
}

export default CategoryShow