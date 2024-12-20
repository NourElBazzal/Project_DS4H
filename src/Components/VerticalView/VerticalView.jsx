import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CircularProgress, Divider } from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import { graphviz } from 'd3-graphviz';
import React, { useEffect, useRef } from 'react';
import './VerticalView.css';

const fetcher = url => axios.get(url).then(res => res.data);

const VerticalView = () => {
    const { viewName } = useParams();
    const navigate = useNavigate();
    const graphvizRef = useRef(null);

    const { data, error, isLoading: loading } = useSWR(`https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetViewContent&index=${viewName}`, fetcher);

    useEffect(() => {
        if (!data) return;
        const { data: content, headers } = data;

        if (headers['content-type'] === 'text/dot' && graphvizRef.current) {
            graphviz(graphvizRef.current).renderDot(content);
        }
    }, [data]);

    const displayContent = (content, headers) => {
        if (headers['content-type'] === 'text/json') {
            return <pre className="content-json">{JSON.stringify(content, null, 2)}</pre>;
        } else if (headers['content-type'] === 'text/html') {
            return <div className="content-html" dangerouslySetInnerHTML={{__html: content}} />;
        } else if (headers['content-type'] === 'image/svg+xml') {
            return <div className="content-svg" dangerouslySetInnerHTML={{__html: content}} />;
        } else if (headers['content-type'] === 'text/plain') {
            return <pre className="content-text">{content}</pre>;
        } else if (headers['content-type'] === 'image/png' || headers['content-type'] === 'image/jpeg') {
            return (
                <div className="content-image">
                    <img src={`data:${headers['content-type']};base64,${content}`} alt="Content" />
                </div>
            );
        } else if (headers['content-type'] === 'text/dot') {
            return <div className="content-dot" ref={graphvizRef} />;
        } else {
            return <pre>Unsupported content type: {headers['content-type']}</pre>;
        }
    }

    if (loading) {
        return (
            <Box className="loading-container">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    if (!data) {
        return <div className="error-message">Error: Data is null.</div>;
    }

    const { data: content, headers } = data;

    return (
        <Box className="vertical-view">
            <Typography variant="h4" gutterBottom>
                View {viewName} Details
            </Typography>
            <Card className="content-card">
                <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Content Type: {headers['content-type']}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box className="content-container">
                        {displayContent(content, headers)}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default VerticalView; 