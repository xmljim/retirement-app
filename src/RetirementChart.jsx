import { BorderColorSharp } from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { assign } from "lodash";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export const RetirementChart = ({retirementData}) => {
    const [chartData, setChartData] = useState([0]);

    useEffect(() => {
        if (retirementData && retirementData.coefficients) {
            let retirementSchedule = retirementData.coefficients.find(coeff => coeff.name === 'retirementSchedule');
            let data = retirementSchedule.value;
            setChartData(data);
        }
    }, [retirementData]);

    const data = chartData;


    const colors = [
        "#483D8B",
        "#525252",
        "#737373",
        "#969696",
        "#bdbdbd",
        "#d9d9d9",
        "#f0f0f0"
    ];
    
    const charcoal = "#483D8B";
    const grey = "#969696";
      
    // Typography
    const sansSerif = "sans-serif";
    const letterSpacing = "normal";
    const fontSize = 4;


        // Layout
    const baseProps = {
        width: 540,
        height: 240,
        padding: 50,
        colorScale: colors
    };

      // Labels
    const baseLabelStyles = {
        fontFamily: sansSerif,
        fontSize,
        letterSpacing,
        padding: 10,
        fill: charcoal,
        stroke: "transparent"
    };
  
    const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);
 
    // Strokes
    const strokeLinecap = "round";
    const strokeLinejoin = "round";
    
    const theme = {
        axis: assign(
            {
                style: {
                    axis: {
                        fill: "transparent",
                        stroke: charcoal,
                        strokeWidth: 1,
                        strokeLinecap,
                        strokeLinejoin
                    },
                    axisLabel: assign({}, 
                        centeredLabelStyles, {
                        padding: 25
                    }),
                    grid: {
                        fill: "none",
                        stroke: "none",
                        pointerEvents: "painted"
                    },
                    ticks: {
                        fill: "transparent",
                        size: 1,
                        stroke: "transparent"
                    },

                    tickLabels: baseLabelStyles
                }
            },
            baseProps
        ),
        bar: assign (
            {
                style: {
                    data: {
                        fill: charcoal,
                        padding: 8,
                        strokeWidth: 0
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        chart: baseProps,
    }
    
    
    return(
        <VictoryChart domainPadding={20} theme={theme}>
            <VictoryAxis tickValues={data.map(item => item.year)}
                tickFormat={(y) => ( y % 4 === 0 ? `${y}`: '')}
                tickLabels={{padding: 2}}/>
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar data={data} x='year' y='balance'/>
        </VictoryChart>
        
    )
};