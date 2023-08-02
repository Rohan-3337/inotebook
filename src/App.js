
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './commponents/Navbar';
import Home from './commponents/Home';
import About from './commponents/About';
import NoteState from './context/notes/NoteState';
import Login from './commponents/Login';
import Singup from './commponents/Singup';
import {useState} from 'react'
import Alert from './commponents/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <>
      <NoteState>

      <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
      <div className="container">
        <Routes>
          <Route exact path="/" key={"home"} element={<Home showAlert={showAlert} />}/>
            <Route exact path="about" key={"about"} element={<About />} />
            <Route path='login' key={'login'} element={<Login showAlert={showAlert}/>}/>
            <Route path='singup' key={'singup'} element={<Singup showAlert={showAlert}/>}/>
          
        </Routes>
      </div>
      </NoteState>
      

    </>
  );
}

export default App;
