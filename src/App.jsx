import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Navbar from "./components/Navbar";
import Model from "./components/Model";
import * as Sentry from '@sentry/react';
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import VideoPage from './components/VideoPage'; // Assuming you have a VideoPage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={

          <main className="bg-black">
            <Navbar />
            <Hero />
            <Highlights />
            <Model />
            <Features />
            <HowItWorks />
            <Footer />
          </main>
        } />
        <Route path="/watch-video" element={<VideoPage />} />
      </Routes>
    </Router>
  );
}

export default Sentry.withProfiler(App);
