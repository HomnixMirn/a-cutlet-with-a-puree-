import './App.css';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Register from './packages/Register';
import Login from './packages/Login';
import Header from './components/Header';
import Cart from './packages/Cart';
import About from './packages/About';


function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/personal_info" element={<Login />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
