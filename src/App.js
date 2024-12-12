import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import MainLayout from "./global/MainLayout";
import InformationPage from "./Components/InformationPage/InformationPage";


const App= () => {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
            <Route path="/information/:viewName" element={<InformationPage />} />
          </Route>

      </Routes>
      </Router>
  );
};

export default App;
