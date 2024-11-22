import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './packages/Register';
import Login from './packages/Login';
import Header from './components/Header';
import Calendar from './packages/Calendar';

function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main>
        <Routes>
        <Route path="/calendar" element={<Calendar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personal_info" element={<Login />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
