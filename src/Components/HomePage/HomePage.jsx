import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import {Link} from "react-router-dom";
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data)

const HomePage = () => {
    const { data, error, isLoading:loading } = useSWR('https://dronic.i3s.unice.fr:8080/?username=user&password=test', fetcher);

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    return (
        <div className="home-page">
            <h1>Vue du Noeud Courant</h1>
            <h2>ID: {data.response.id}</h2>

            <h3>Vues Disponibles:</h3>
            <ul>
                {data.response.views.map((view, index) => (
                    <li key={index}>
                        <Link to={`/information/${index}`}>
                            <strong>{view.name}</strong>: {view.contentType}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;