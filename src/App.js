import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import MainLayout from "./global/MainLayout";
import BarChart from './global/BarChart.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                
                {/* Protected routes */}
                <Route element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/barChart" element={<BarChart />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
