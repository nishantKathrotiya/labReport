import {Route,Routes} from 'react-router-dom'
import Form from './Pages/Form'
import Dashboard from './Pages/Dashboard'
function App() {
  
  return (
    <div className='mainDiv'>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  )
}

export default App
