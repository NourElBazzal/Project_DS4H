import {useParams} from 'react-router-dom';
import axios from 'axios';
import './InformationPage.css';
import useSWR from 'swr';
import {graphviz} from 'd3-graphviz';
import React, {useEffect, useRef} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialLight} from "react-syntax-highlighter/src/styles/prism";


const fetcher = url => axios.get(url);

const InformationPage = () => {
    const {viewName} = useParams();
    let {
        data,
        error,
        isLoading: loading
    } = useSWR(`https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetViewContent&index=${viewName}`, fetcher);

    const graphvizRef = useRef(null);

    useEffect(() => {
        if (!data) return;
        const {data: content, headers} = data;

        if (headers['content-type'] === 'text/dot' && graphvizRef.current) {
            graphviz(graphvizRef.current).renderDot(content);
        }
    }, [data]);

    const displayContent = (content, headers) => {
        if (headers['content-type'] === 'text/json') {
            return <SyntaxHighlighter language="json" style={materialLight}>
                {JSON.stringify(content, null, "\t")}
            </SyntaxHighlighter>
            return (
                <div className="content-container">
                    <pre>{JSON.stringify(content, null, 2)}</pre>
                </div>
            );
        } else if (headers['content-type'] === 'text/html') {
            return (
                <div className="content-container html-content">
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
            );
        } else if (headers['content-type'] === 'image/svg+xml') {
            return (
                <div className="content-container">
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
            );
        } else if (headers['content-type'] === 'text/plain') {
            return (
                <div className="content-container">
                    <pre>{content}</pre>
                </div>
            );
        } else if (headers['content-type'] === 'image/png' || headers['content-type'] === 'image/jpeg') {
            return (
                <div className="content-container">
                    <img src={`data:${headers['content-type']};base64,${content}`} alt="Content"/>
                </div>
            );
        } else if (headers['content-type'] === 'text/dot') {
            return (
                <div className="content-container graphviz-container">
                    <div ref={graphvizRef}/>
                </div>
            );
        } else if (headers['content-type'] === 'image/jsondot') {
            return <div className="content-container">
                <SyntaxHighlighter language="json" style={materialLight}>
                    {JSON.stringify(content, null, "\t")}
                </SyntaxHighlighter>
            </div>
        } else if (headers['content-type'] === 'text/java') {
            return <div className="content-container">
                <SyntaxHighlighter language="java" style={materialLight}>
                    {content}
                </SyntaxHighlighter>
            </div>
        } else {
            return (
                <div className="error-message">
                    Unsupported content type: {headers['content-type']}
                </div>
            );
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <CircularProgress/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="information-page">
                <div className="error-message">Error: {error.message}</div>
            </div>
        );
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    const {data: content, headers} = data;

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