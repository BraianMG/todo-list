import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import NewTask from "./components/NewTask";
import Signup from "./components/Signup";
import Tasks from "./components/Tasks";

function App() {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [token, setToken] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={ <Login user={user} setUser={setUser} setToken={setToken} /> }
          />
        <Route 
          path='/signup'
          element={ <Signup user={user} setUser={setUser} setToken={setToken} /> }
          />
        <Route
          path="/mytasks"
          element={ <Tasks user={user} token={token} /> }
        />
        <Route
          path="/newtask"
          element={ <NewTask user={user} token={token} /> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
