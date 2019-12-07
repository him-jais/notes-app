import React from 'react'
import axios from 'axios'
import CategoryForm from './categoryForm'

class CategoryEdit extends React.Component {
    constructor(){
        super()
        this.state={
            category:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/categories/${id}`, {
            headers: {
                'x-auth' :localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const category = response.data
            this.setState({category})
        })
    }
    handleSubmit(formData){
        const id= this.props.match.params.id
        axios.put(`http://localhost:3015/categories/${id}`, 
        formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push(`/categories/${response.data._id}`)
            }
        })
    }
    render() {
        return (
            <div>
                <h2>Edit Category</h2>
                {Object.keys(this.state.category).length !==0 && <CategoryForm  category={this.state.category} handleSubmit ={this.handleSubmit}  /> }
                   
                </div>
        )
    }
}

export default CategoryEdit