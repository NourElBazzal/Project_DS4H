import React, { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import MainLayout from "./global/MainLayout";
import InformationPage from "./Components/InformationPage/InformationPage";
import GridViewer from "./Components/GridView/GridView.jsx";


const App= () => {
  const [currentView, setCurrentView] = useState("default");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  
  return (
      <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route element={<MainLayout onViewChange={handleViewChange}/>}>
        
          <Route path="/home" element={<HomePage />} />
          <Route path="/information/:viewName" element={<InformationPage />} />

          <Route
            path="/viewer" element= {<GridViewer />}
          />
           
          </Route>

      </Routes>
      </Router>
  );
};

export default App;
