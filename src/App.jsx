import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Galleries from './pages/Galleries';
import Contact from './pages/Contact';
import Success from './pages/Success';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div dir="rtl" className="min-h-screen flex flex-col relative selection:bg-secondary-container selection:text-on-secondary-container">
        <Navbar />
        <main className="flex-1 relative z-10 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galleries" element={<Galleries />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
            <Route path="/gallery/:id" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
