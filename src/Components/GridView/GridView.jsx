import {useNavigate} from 'react-router-dom';
import {Card, CardContent, CircularProgress, Grid2, Typography} from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import React from 'react';
import {View} from "../Common/View.jsx";


const fetcher = url => axios.get(url).then(res => res.data);

const GridView = () => {
    const navigate = useNavigate();

    const {
        data,
        isLoading: loading,
        error
    } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetNodeInfo', fetcher);

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
                <CircularProgress/>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Error: Data is null.</div>;
    }

    const {result} = data; // Extract the result object from API response
    const views = result?.views || []; // Safely access the views array

    return (
        <div style={{padding: '20px'}}>
            <Typography variant="h4" gutterBottom>
                Views
            </Typography>
            <Grid2 container spacing={5}>
                {
                    views.map((view, index) => (
                        <Grid2 xs={12} sm={6} md={4} key={index}>
                            <Card
                                style={{cursor: 'pointer'}}
                                onClick={() => navigate(`/information/${index}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6">
                                        {view.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Content:
                                        <View viewId={index}/>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                }
            </Grid2>
        </div>
    );
};

export default GridView;