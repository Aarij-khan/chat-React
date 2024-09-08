import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Signup from "./Signup"
import Login from "./login"
import Home from "./home"
import Chat from "./chat"
import Loader from "./loader"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loader props='flex justify-center items-center h-screen w-full' />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App