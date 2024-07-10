import Navigation from './Components/Navigation';
import { Outlet } from 'react-router-dom';
import "./App.css"
// import { AuthProvider } from './AuthContext';

function App() {
  return (
      // <AuthProvider>
        <div className='app-layout'>
          <Navigation/>
          <Outlet />
        </div>
      // </AuthProvider>
  )
}






export default App
