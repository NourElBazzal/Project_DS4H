import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import './InformationPage.css';

// Fetcher function using Axios
const fetcher = (url) => axios.get(url).then((res) => res.data);

const InformationPage = () => {
    const backendURL = "https://dronic.i3s.unice.fr:8080/?username=user&password=test";

    // Use SWR to fetch data
  const { data, error, isLoading } = useSWR(backendURL, fetcher);

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error loading data: {error.message}</div>;

  // Extract "views" from data
  const views = data?.response?.views || [];

  // Render content
  return (
    <div>
      <h1>Content from Backend</h1>
      {views.length > 0 ? (
        views.map((view, index) => (
          view.content ? (
            <div key={index}>
              <h2>{view.name}</h2>
              <pre>{typeof view.content === 'object' ? JSON.stringify(view.content, null, 2) : view.content}</pre>
            </div>
          ) : null
        ))
      ) : (
        <p>No content available in views.</p>
      )}
    </div>
  );
}; 

export default InformationPage;