import Navigation from './components/Navigation';
import { Outlet } from 'react-router-dom';
import "./App.css"

function App(props) {
  return (
      <div className='app-layout'>
        <Navigation name={props.name}/>
        <Outlet />
      </div>
  )
}

export default App
