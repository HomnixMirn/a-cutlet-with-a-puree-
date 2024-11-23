import './App.css';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Register from './packages/Register';
import Login from './packages/Login';
import Header from './components/Header';
import Cart from './packages/Cart';
import About from './packages/About';
import Calendar from './packages/Calendar';
import LK from './packages/LK';
import Activity from './packages/ActivCart';

function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/personal_info" element={<Login />} />
          <Route path='/user' element={<LK/>}/>
          <Route path="/event/:id" element={<Activity />} /></Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
