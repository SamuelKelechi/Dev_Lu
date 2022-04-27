import React,{useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import Birthday from './Components/Birthday';
import Loader from './Components/Loader/Loader';
import Admin from './Components/Admin';
import GlobalStyle from './globalStyle';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App () {
  const [done, setDone] = useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      setDone(true)
    }, 4000);
  }, [])
  return(
    <>
    <Router>
    <GlobalStyle />
    {
      !done ? <Loader /> :  
      <Routes>
        <Route path='/' element={<Birthday />} />
        <Route path='/adminlulu' element={<Admin />} />
      </Routes>
    }
    
     </Router>
    </>
  )
}
export default App


