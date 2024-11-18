import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  )
}

export default App
