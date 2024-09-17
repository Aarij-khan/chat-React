import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Signup from "./Signup"
import Login from "./login"
import Home from "./home"
import Chat from "./chat"
import Profile from "./profile"
// import Api from "./api"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        {/* <Route path='/api' element={<Api/>}/> */}
      </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App