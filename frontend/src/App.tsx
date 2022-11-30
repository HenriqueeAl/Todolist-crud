import './App.scss'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/register';
import { Task } from './components/task/task';

function App() {
  
  return (
    <BrowserRouter>
        <Routes>

          <Route path="*" element={
                <Login/>
          }>

          </Route>

          <Route path="/register" element={<Register />}>


          </Route>

          <Route path="/tasks" element={<Task></Task>}>


          </Route>

        </Routes>
        
      </BrowserRouter>
  )
}

export default App
