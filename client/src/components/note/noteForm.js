import React from 'react'
import axios from 'axios'

class NoteForm extends React.Component {
    constructor(Props) {
        super(Props)
        this.state = {
            title:Props.note ? Props.note.title : '',
            description:Props.note ? Props.note.description : '',
            categoryId:Props.note ? Props.note.categoryId :'',
            categorys:[]
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount=()=>{
        axios.get('http://localhost:3015/categories',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            this.setState({categorys:response.data})
        })
       }

    handleChange(e) {
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            title: this.state.title,
            description:this.state.description,
            categoryId:this.state.categoryId
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    select=(e)=>{
        this.setState({categoryId:e.target.value})
       }

    render() {
        console.log(this.state.categorys)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        title <input type="text" value={this.state.title} onChange={this.handleChange} name="title"/>
                    </label> <br/>
                    <label>
                        description <input type="text" value={this.state.description} onChange={this.handleChange} name="description"/>
                    </label> 
                    category<select onChange={this.select}>
                       <option value=''>select categories</option>
                       {this.state.categorys.map(item=>{
                           return(<option key={item._id} value={item._id}>{item.name}</option>)
                       })}
                   </select>
                    <br/>
                    
                    <input type="submit" />

                </form>
            </div>
        )
    }
}

export default NoteForm 