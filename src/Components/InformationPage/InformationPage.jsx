import { useParams } from 'react-router-dom';
import axios from 'axios';
import './InformationPage.css';
import useSWR from 'swr';
import {graphviz} from 'd3-graphviz';
import React, { useEffect, useRef } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import {useTitle} from "../../global/useTitle";
import {ResponsiveBar} from "@nivo/bar";
import {ResponsiveLine} from "@nivo/line";
import SyntaxHighlighter from "react-syntax-highlighter/src/light";
import {materialLight} from "react-syntax-highlighter/src/styles/prism";

const fetcher = url => axios.get(url);

const InformationPage = () => {
    const { viewName } = useParams();
    let { data, error, isLoading: loading } = useSWR(`https://dronic.i3s.unice.fr:8080/api?username=user&password=test&endpoint=GetViewContent&index=${viewName}`, fetcher);

    const graphvizRef = useRef(null);

    useTitle(`Information for View ${viewName}`);

    useEffect(() => {
        if (!data) return;
        const { data: content, headers } = data;

        if (headers['content-type'] === 'text/dot' && graphvizRef.current) {
            graphviz(graphvizRef.current).renderDot(content);
        }
    }, [data]);

    const displayContent = (content, headers) => {
        if (headers['content-type'] === 'text/json+xy2') {
            const parsedChartData = parseNivoChartData(content);
            console.log(parsedChartData)
            return (
                <div style={{ height: 400,width: 800 }}>
                    <ResponsiveLine
                        data={parsedChartData}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'linear' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
                        axisBottom={{
                            legend: 'X Axis',
                            legendOffset: 36,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            legend: 'Y Axis',
                            legendOffset: -40,
                            legendPosition: 'middle',
                        }}
                        colors={{ scheme: 'set2' }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                            },
                        ]}
                    />
                </div>
            );
        }else if(headers['content-type'] === 'text/json+distribution'){
            const barChartData=parseBarChartData(content);
            const keys= Object.keys(Object.values(content).reduce((a,b) => Object.assign({}, a, b)))
            return (
                <div style={{ height: 400,width: 800 }}>
                    <ResponsiveBar
                        data={barChartData}
                        keys= {keys}
                        indexBy={"group"}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        groupMode="grouped"
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
                    />
                </div>
            )

        } else if (headers['content-type'] === 'text/json') {
            return (
                <div className="content-container">
                    <SyntaxHighlighter language="json" style={materialLight}>
                        {JSON.stringify(content, null, 2)}
                    </SyntaxHighlighter>
                </div>
            );
        } else if (headers['content-type'] === 'text/html') {
            return (
                <div className="content-container html-content">
                    <div dangerouslySetInnerHTML={{__html: content}} />
                </div>
            );
        } else if (headers['content-type'] === 'image/svg+xml') {
            return (
                <div className="content-container">
                    <div dangerouslySetInnerHTML={{__html: content}} />
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
                    <img src={`data:${headers['content-type']};base64,${content}`} alt="Content" />
                </div>
            );
        } else if (headers['content-type'] === 'text/dot') {
            return (
                <div className="content-container graphviz-container">
                    <div ref={graphvizRef} />
                </div>
            );
        } else {
            return (
                <div className="error-message">
                    Unsupported content type: {headers['content-type']}
                </div>
            );
        }
    };

    const parseNivoChartData = (content) => {
        const result = [];
        for(let key of Object.keys(content)){
            const cosData = content?.[key]?.data || {};
            const cosLine = {
                id: key,
                data: Object.keys(cosData).map(key => ({ x: parseFloat(key), y: cosData[key] })),
            };
            result.push(cosLine)
        }
        return result;
    };

    const parseBarChartData = (content) => {
        const result = [];
        for(let group of Object.keys(content)){
            const cosData = content?.[group] || {};
            const cosLine = {
                group: group,
                ...cosData
            };
            result.push(cosLine)
        }
        return result;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <CircularProgress />
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