import React,{useState, useEffect} from 'react';
import Birthday from './Components/Birthday';
import Loader from './Components/Loader/Loader';
import GlobalStyle from './globalStyle';

function App () {
  const [done, setDone] = useState(undefined)

  useEffect(() => {
    setTimeout(() => {
      setDone(true)
    }, 4000);
  }, [])
  return(
    <>
    <GlobalStyle />
    {
      !done ? <Loader /> :  <Birthday />
    }
    </>
  )
}
export default App


