import React from 'react';
import axios from './components/config/axios'
import { BrowserRouter, Route, Link ,Switch} from 'react-router-dom'

import Register from './components/register'
import Login from './components/login'
import Home from './components/home'

import CategoryList from './components/category/categoryList'
import CategoryShow from './components/category/categoryShow'
import CategoryNew from './components/category/categoryNew'
import CategoryEdit from './components/category/categoryEdit'

import NoteList from './components/note/noteList'
import NoteShow from './components/note/noteShow'
import NoteNew from './components/note/noteNew'
import NoteEdit from './components/note/noteEdit'

function App() {
  function handleClick() {
    axios.delete('/users/logout', {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then(response => {
      console.log(response)
      alert(response.data.notice)
      localStorage.removeItem('authToken')
      window.location.reload()
      window.location.href = "/"
    })
  }
  return (
    <BrowserRouter>
    <div>
        <h1>Notes App</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          {
            localStorage.getItem('authToken') ? (
              <div>
                <li><Link to="/categories">Categorys</Link></li>
                <li><Link to="/notes">Notes</Link></li>
                <li><Link to="#" onClick={handleClick}>Logout</Link></li>
              </div>
            ) : (
              <div>
                <li><Link to="/users/register">Register</Link></li>
                <li><Link to="/users/login">Login</Link></li>
              </div>
            )
          }
        </ul>
        <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login} />
        <Route path="/categories" component={CategoryList} exact={true} />
        <Route path ="/categories/new" component={CategoryNew} exact={true}/>
        <Route path ="/categories/:id" component={CategoryShow}  exact={true}/>
        <Route path ="/categories/edit/:id" component={CategoryEdit} exact={true}/>

        <Route path="/notes" component={NoteList} exact={true} />
        <Route path ="/notes/new" component={NoteNew} exact={true}/>
        <Route path ="/notes/:id" component={NoteShow}  exact={true}/>
        <Route path ="/notes/edit/:id" component={NoteEdit} exact={true}/>



        </Switch>
    </div> 
    </BrowserRouter>
  )
}

export default App;