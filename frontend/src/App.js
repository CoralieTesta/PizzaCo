import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/User/Nav/Nav';
import Header from './components/User/Header/Header';
import { useSelector } from 'react-redux';
import NavAdmin from './components/Admin/AdminNav/AdminNav';
import Footer from './components/User/Footer/Footer';
import AdminFooter from './components/Admin/AdminFooter/AdminFooter';

function App() {
  const isConnect = useSelector(store => store.ADMIN.isConnect)
  return (
    <div className="App">
      {isConnect?
        (<NavAdmin/>)
        :
        (<>
          <Header />
          <Nav />
        </>)
      }
      <Outlet />
      {isConnect?
        (<AdminFooter/>)
        :
        (<Footer/>)
      }
    </div>
  );
}

export default App;
