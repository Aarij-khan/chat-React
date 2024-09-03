import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Signup from "./Signup"
import Login from "./login"
import Home from "./home"
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  )
}

export default App