import { Outlet } from 'react-router-dom';
import './App.scss';
import PerfectScrollbar from 'react-perfect-scrollbar'
//import HomeNavbar from './components/Home/HomeComponents/HomeNavbar';


const App = () => {
  return (
    <div className="app-container">
      {/* <div className='header-container'>
        <HomeNavbar />
      </div> */}
      <div className='app-content'>
        <PerfectScrollbar>
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default App;
