import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InformationPage.css';
import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data);


const InformationPage = () => {
    const { viewName } = useParams();
    let { data, error, isLoading: loading } = useSWR(`https://dronic.i3s.unice.fr:8080/?username=user&password=test&view=${viewName}`, fetcher);

  // Error state
  if (error) return <div>Error loading data: {error.message}</div>;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    const { data: content, headers } = data;

    console.log(headers);

    return (
        <div className="information-page">
            <h1>Information for View {viewName}</h1>
            <div>
                <h2>Content:</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
};

export default InformationPage;