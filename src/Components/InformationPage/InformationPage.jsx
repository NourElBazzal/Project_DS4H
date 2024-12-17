import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InformationPage.css';
import useSWR from 'swr';
import {graphviz} from 'd3-graphviz';
import React, { useEffect, useRef } from 'react';

const fetcher = url => axios.get(url);

const InformationPage = () => {
    const { viewName } = useParams();
    let { data, error, isLoading: loading } = useSWR(`https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetViewContent&index=${viewName}`, fetcher);

    const graphvizRef = useRef(null);

    useEffect(() => {
        if (!data) return;
        const { data: content, headers } = data;

        if (headers['content-type'] === 'text/dot' && graphvizRef.current) {
            graphviz(graphvizRef.current).renderDot(content);
        }
    }, [data]);

    const displayContent = (content, headers) => {
        if (headers['content-type'] === 'text/json') {
            return <pre>{JSON.stringify(content, null, 2)}</pre>;
        } else if (headers['content-type'] === 'text/html') {
            return <div dangerouslySetInnerHTML={{__html: content}} />;
        } else if (headers['content-type'] === 'image/svg+xml') {
            return <div dangerouslySetInnerHTML={{__html: content}} />;
        } else if (headers['content-type'] === 'text/plain') {
            return <pre>{content}</pre>;
        } else if (headers['content-type'] === 'image/png') {
            return <img src={`data:image/png;base64,${content}`} alt="PNG" />;
        } else if (headers['content-type'] === 'image/jpeg') {
            return <img src={`data:image/jpeg;base64,${content}`} alt="JPEG" />;
        } else if (headers['content-type'] === 'text/dot') {
            return <div ref={graphvizRef} />;
        } else {
            return <pre>Unsupported content type: {headers['content-type']}</pre>;
        }
    }

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    const { data: content, headers } = data;

    return (
        <div className="information-page">
            <h1>Information for View {viewName}</h1>
            <div>
                <h2>Content:</h2>
                {displayContent(content, headers)}
            </div>
        </div>
    );
};

export default InformationPage;