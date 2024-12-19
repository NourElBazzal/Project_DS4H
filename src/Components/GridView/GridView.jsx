import { useNavigate, useParams } from 'react-router-dom';
import { Grid2, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import { graphviz } from 'd3-graphviz';
import React, { useEffect, useRef } from 'react';


const fetcher = url => axios.get(url).then(res => res.data);

const GridView = () => {
    const { viewName } = useParams();
    const navigate = useNavigate();
    const graphvizRef = useRef(null);

    const { data, error, isLoading: loading } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetViewContent&index=${viewName}', fetcher);

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
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    const { result } = data; // Extract the result object from API response
    const views = result?.views || []; // Safely access the views array

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Views for {viewName}
            </Typography>
            <Grid2 container spacing={5}>
                <Grid2 xs={12} sm={6} md={4} key={index}>
                    <Card
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/information/${index}')}
                    >
                        <CardContent>
                            <Typography variant="h6">
                                {viewName} {/* Use viewName directly */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Content: {displayContent(content, headers)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default GridView;