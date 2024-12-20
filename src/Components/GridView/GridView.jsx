import { useNavigate, useParams } from 'react-router-dom';
import { Grid2, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import useSWR from 'swr';
import axios from 'axios';
import { graphviz } from 'd3-graphviz';
import React, { useEffect, useRef } from 'react';


const fetcher = url => axios.get(url).then(res => res.data);

const GridView = () => {
    const { viewName } = useParams();
    let { data, error, isLoading: loading } = useSWR(`https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetViewContent&index=${viewName}`, fetcher);
    
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
    
        if (!data) {
            return <div>Error: Data is null.</div>;
        }

    
};

export default GridView;