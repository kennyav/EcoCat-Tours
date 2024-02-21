import React, {useState} from 'react';
// import main
import Main from "./components/Main";
import Login from "./components/Login"

function App() {
  const [login, setLogin] = useState(false)

  return (
    login ? <Main setLogin={setLogin}/> :  <Login setLogin={setLogin}/>
  );
}

export default App;
