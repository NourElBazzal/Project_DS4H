import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InformationPage.css';

const InformationPage = () => {
    const { viewName } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://dronic.i3s.unice.fr:8080/?username=user&password=test&view=${viewName}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [viewName]);

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    return (
        <div className="information-page">
            <h1>Information for View {viewName}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default InformationPage;