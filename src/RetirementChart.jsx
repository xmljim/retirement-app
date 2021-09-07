import { BorderColorSharp } from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { assign } from "lodash";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';

export const RetirementChart = ({retirementData}) => {
    const [chartData, setChartData] = useState([0]);

    useEffect(() => {
        if (retirementData && retirementData.coefficients) {
            let currentAgeParam = retirementData.parameters.find(param => param.name === 'currentAge');
            let currentAge = currentAgeParam.value;
            let currentYear = new Date().getFullYear();
            let retirementSchedule = retirementData.coefficients.find(coeff => coeff.name === 'retirementSchedule');
            let data = retirementSchedule.value;
            let displayData = data.map(balanceItem => {
                let ledgerAge = currentAge + (balanceItem.year - currentYear);
                let label = "Age: " + ledgerAge + "\n" +
                    "Year: " + balanceItem.year + "\n" +
                    "Type: " + toTitleCase(balanceItem.type) + "\n" +
                    "Balance: " + formatCurrency(balanceItem.balance) + "\n" +
                    "Interest: " + formatCurrency(balanceItem.interestAccrued) + "\n";
                
                if (balanceItem.type === 'contribution') {
                    label += "Self Contribution: " + formatCurrency(balanceItem.estimatedSelfContribution) + "\n" +
                        "Employer Contribution: " + formatCurrency(balanceItem.estimatedEmployerContribution);
                } else {
                    label += "Distribution Amount: " + formatCurrency(balanceItem.annualDistributionAmount);
                }

                return {
                    year: balanceItem.year,
                    balance: balanceItem.balance,
                    label: label,
                }
            })
            setChartData(displayData);
        }
    }, [retirementData]);


    const formatCurrency = (value) => {
        let formattedNumber = '';
        let isNegative = false;
        if (value < 0) {
            isNegative = true;
            let invert = value * -1;
            formattedNumber =invert.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else {
            formattedNumber = value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        return '$' + formattedNumber;
    };

    const toTitleCase = (str) => {
        let char0 = str.charAt(0).toUpperCase();
        let rest = str.substring(1);
        return char0 + rest;
    };

    const formatPct = (value) => {
        let newValue = value * 100;
        let pct = newValue.toFixed(1) + '%';
        return pct;
    }

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
    const fontSize = 6;


        // Layout
    const baseProps = {
        width: 540,
        height: 300,
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

    let events = [{
        target: "data",
        eventHandlers: {
          onMouseOver: () => {
            return [
              {
                target: "data",
                mutation: () => ({style: {fill: "gold"}})
              }, {
                target: "labels",
                mutation: () => ({ active: true })
              }
            ];
          },
          onMouseOut: () => {
            return [
              {
                target: "data",
                mutation: () => {}
              }, {
                target: "labels",
                mutation: () => ({ active: false })
              }
            ];
          }
        }
      }];
    
    
    return(
        <VictoryChart domainPadding={20} theme={theme} >
            <VictoryAxis tickValues={data.map(item => item.year)}
                tickFormat={(y) => ( y % 4 === 0 ? `${y}`: '')}
                tickLabels={{padding: 2}}/>
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar data={data} x='year' y='balance' 
                labelComponent={<VictoryTooltip />}
                events={events} />
        </VictoryChart>
        
    )
};