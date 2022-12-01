import './App.scss'
import Login from './pages/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/register';
import { Task } from './components/task/task';
import { ProtectedLayout } from './utils/protect';
import { AuthContext, AuthProvider } from './utils/authprovider';

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="*" element={
                <ProtectedLayout>
                    <Task></Task>
                </ProtectedLayout>
          }>

          </Route>

          <Route path="/register" element={<Register />}>


          </Route>

        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
