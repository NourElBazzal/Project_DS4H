import {useNavigate} from 'react-router-dom';
import {Box, Card, CardContent, CircularProgress, Grid2, Typography} from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import React from 'react';
import {View} from "../Common/View.jsx";
import {useTitle} from "../../global/useTitle.jsx";

const fetcher = url => axios.get(url)

const GridView = () => {
    const navigate = useNavigate();
    useTitle("Views");
    const {
        data,
        isLoading: loading,
        error
    } = useSWR('https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetNodeInfo', fetcher);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || !data.data) {
        return <div>Error: Data is null.</div>;
    }

    const {data: {result}} = data; // Extract the result object from API response
    const views = result?.views || []; // Safely access the views array

    return (
        <Box sx={{padding: {xs: '5px', md: '40px'}, maxWidth: '100%', margin: '0 auto'}}>
            <Typography variant="h4" gutterBottom sx={{marginBottom: '32px'}}>
                Views
            </Typography>
            <Grid2 container spacing={4}>
                {
                    views.map((view, index) => (
                        <Grid2 size={{xs: 12, sm: 6}} key={index}>
                            <Card
                                sx={{
                                    cursor: 'pointer',
                                    aspectRatio: '1',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                onClick={() => navigate(`/information/${index}`)}
                            >
                                <CardContent
                                    sx={{
                                        padding: '24px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Typography variant="h6" sx={{
                                        marginBottom: '16px',
                                        flexShrink: 0
                                    }}>
                                        {view.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{
                                            flex: 1,
                                            overflow: 'auto',
                                            msOverflowStyle: 'none',  // Hide scrollbar for IE and Edge
                                            scrollbarWidth: 'none',   // Hide scrollbar for Firefox
                                            '&::-webkit-scrollbar': {
                                                display: 'none'       // Hide scrollbar for Chrome, Safari, and Opera
                                            },
                                        }}
                                    >
                                        Content:
                                        <View viewId={index}/>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                }
            </Grid2>
        </Box>
    );
};

export default GridView;