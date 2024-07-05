import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import "./App.css"

function App() {
  return (
      <div className='app-layout'>
        <Navigation/>
        <Outlet />
      </div>
  )
}

export default App
