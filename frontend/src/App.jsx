import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'

const App = () => {
  return (
    <div>
      <Routes>
 <Route path="/login" element={<Login/>} />  
  <Route path="/register" element={<Register/>} />  
   <Route path="/" element={<Todo/>} />  
  </Routes>
    </div>
  )
}

export default App
