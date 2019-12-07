import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'

export default class CategoryList extends React.Component{
    constructor() {
        super()
        this.state = {
            categorys: []
        }
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm("Are you Sure?")
        if(confirmRemove) {
            axios.delete(`/categories/${id}`, {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(response => {
                console.log(response.data)
                this.setState(prevState => ({
                    categorys: prevState.categorys.filter(category => category._id !== response.data._id)
                }))
            })
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3015/categories', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const categorys = response.data
            this.setState({categorys})
        })
    }

    render() {
        return (
            <div>
                <h2>Listing category - { this.state.categorys.length }</h2>
                
                <table border="1">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                           
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.categorys.map(category => {
                               return (
                                   <tr key={category._id}>
                                       <td>{category._id}</td>
                                       <td>{category.name}</td>
                                      
                                      
                                       <td>
                                           <Link to={`categories/${category._id}`}>Show</Link> ||
                                           <button onClick={() => {
                                               this.handleRemove(category._id)
                                           }}>Remove</button>
                                       </td>
                                    </tr>
                               )
                           }) 
                        }
                    </tbody>
                </table>
                <Link to="/categories/new"> Add Category </Link>
            </div>
        )
    }
}
