import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createContext } from 'react'
import SignIn from './components/signIn'
import Exp from './components/exp'
import { Book } from './components/signIn'
import { DegreeSet } from './components/signIn'
export const User=createContext()

var test=false

function App() {
  function changeScreen(){
    setState(<SignUp/>)
}
  const[state,setState]=useState(<SignIn/>)
  

  return     <div>
    <User.Provider value={{setState}}>
    {test?<Book/>:state}

  </User.Provider>
  

</div>
    
     
  
     
    
  
}
{/*  */}
export default App
