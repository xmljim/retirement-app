import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export const RetirementSummary = ({retirementData}) => {
    // state values mapped to parameters and coefficients in the retirementData payload
    const [retirementYear, setRetirementYear] = useState(0);
    const [balanceAtRetirement, setBalanceAtRetirement] = useState(0);
    const [incomePct, setIncomePct] = useState(0);
    const [distributionLengthYears, setDistributionLengthYears] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalDistributions, setTotalDistributions] = useState(0);
    const [totalEmployerContributions, setTotalEmployerContributions] = useState(0);
    const [totalSelfContributions, setTotalSelfContributions] = useState(0);
    const [retirementDepleteYear, setRetirementDepleteYear] = useState(0);
    const [currentAge, setCurrentAge] = useState(0);
    const [retirementAge, setRetirementAge] = useState(0);
    const [currentRetirementBalance, setCurrentRetirementBalance] = useState(0);
    const [selfContributionPct, setSelfContributionPct] = useState(0);
    const [employerContributionPct, setEmployerContributionPct] = useState(0);
    const [colaPct, setColaPct] = useState(0);
    const [weightedGrowthRate, setWeightedGrowthRate] = useState(0);
    const [postRetirementInterestRate, setPostRetirementInterestRate] = useState(0);
    const [distributionFrequency, setDistributionFrequency] = useState(0);
    const [inflationRate, setInflationRate] = useState(0);
    const [retirementDuration, setRetirementDuration] = useState(0);
    const [annualizedLastSalaryPct, setAnnualizedLastSalaryPct] = useState(0);
    const [currentSalary, setCurrentSalary] = useState(0);

    //When retirementData changes, extract the values and apply to each state value
    useEffect(() => {
        if (retirementData) {
            let retirementYearCoeff = getCoefficient("retirementYear");
            if (retirementYearCoeff) {
                setRetirementYear(retirementYearCoeff.value);
            }

            let retirementBalanceCoeff = getCoefficient("contributionBalance");
            if (retirementBalanceCoeff) {
                setBalanceAtRetirement(retirementBalanceCoeff.value);
            }

            let incomePctCoeff = getCoefficient("retirementIncomePct");
            if (incomePctCoeff) {
                setIncomePct(incomePctCoeff.value);
            }

            let retirementLengthCoeff = getCoefficient("distributionLengthYears");
            if (retirementLengthCoeff) {
                setDistributionLengthYears(retirementLengthCoeff.value);
            }

            let totalInterestCoeff = getCoefficient("totalInterest");
            if (totalInterestCoeff) {
                setTotalInterest(totalInterestCoeff.value);
            }

            let totalDistributionsCoeff = getCoefficient("totalDistributions");
            if (totalDistributionsCoeff) {
                setTotalDistributions(totalDistributionsCoeff.value);
            }
            
            let totalEmployerContributionsCoeff = getCoefficient("totalEmplContribution");
            if (totalEmployerContributionsCoeff) {
                setTotalEmployerContributions(totalEmployerContributionsCoeff.value);
            }

            let totalSelfContributionsCoeff = getCoefficient("totalSelfContribution");
            if (totalSelfContributionsCoeff) {
                setTotalSelfContributions(totalSelfContributionsCoeff.value);
            }

            let retirementDepleteYearCoeff = getCoefficient("retirementDepletionYear");
            if (retirementDepleteYearCoeff) {
                setRetirementDepleteYear(retirementDepleteYearCoeff.value);
            }

            let currentAgeParam = getParameter("currentAge");
            if (currentAgeParam) {
                setCurrentAge(currentAgeParam.value);
            }

            let retirementAgeParam = getParameter("retirementAge");
            if (retirementAgeParam) {
                setRetirementAge(retirementAgeParam.value);
            }

            let currentRetirementBalanceParam = getParameter("currentRetirementBalance");
            if (currentRetirementBalanceParam) {
                setCurrentRetirementBalance(currentRetirementBalanceParam.value);
            }

            let selfContributionPctParam = getParameter("employeeContributionPct");
            if (selfContributionPctParam) {
                setSelfContributionPct(selfContributionPctParam.value);
            }

            let employerContributionPctParam = getParameter("employerContributionPct");
            if (employerContributionPctParam) {
                setEmployerContributionPct(employerContributionPctParam.value);
            }

            let weightedGrowthRateParam = getParameter("weightedGrowthRate");
            if (weightedGrowthRateParam) {
                setWeightedGrowthRate(weightedGrowthRateParam.value);
            }

            let postRetirementInterestRateParam = getParameter("postRetirementInterest");
            if (postRetirementInterestRateParam) {
                setPostRetirementInterestRate(postRetirementInterestRateParam.value);
            }

            let distributionFrequencyParam = getParameter("distributionFrequency");
            if (distributionFrequencyParam) {
                setDistributionFrequency(distributionFrequencyParam.value);
            }
            
            let inflationRateParam = getParameter("inflationRate");
            if (inflationRateParam) {
                setInflationRate(inflationRateParam.value);
            }

            let retirementDurationParam = getParameter("retirementDuration");
            if (retirementDurationParam) {
                setRetirementDuration(retirementDurationParam.value);
            }

            let annualizedLastSalaryPctParam = getParameter("annualizedLastSalaryPct");
            if (annualizedLastSalaryPctParam) {
                setAnnualizedLastSalaryPct(annualizedLastSalaryPctParam.value);
            }

            let currentSalaryParam = getParameter("currentSalary");
            if (currentSalaryParam) {
                setCurrentSalary(currentSalaryParam.value);
            }

        }

    },[retirementData]);

    const getCoefficient = (coefficientName) => {
        let coefficient = retirementData.coefficients.find(coeff => coeff.name === coefficientName);
        return coefficient;
    };

    const getParameter = (paramName) => {
        let parameter = retirementData.parameters.find(param => param.name === paramName);
        return parameter;
    }

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

    const formatPct = (value) => {
        let newValue = value * 100;
        let pct = newValue.toFixed(1) + '%';
        return pct;
    }

    return (
        <Paper style={{width: '80%', height: '80%', textAlign: 'left', padding: '4pt 4pt 2pt'}}>
            <div>
                If you retire at the age of <strong>{retirementAge}</strong> in <strong>{retirementYear}</strong>, 
                your current retirement balance of <strong>{formatCurrency(currentRetirementBalance)}</strong> will
                result in an estimated balance of <strong>{formatCurrency(balanceAtRetirement)}</strong>. 
                Over this time, you will contribute <strong>{formatCurrency(totalSelfContributions)}</strong>, 
                and your employer will add another <strong>{formatCurrency(totalEmployerContributions)}</strong>.
            </div>
            <div style={{marginTop: '8pt'}}>
                Based on these estimates, your retirement will last {distributionLengthYears} years and this account will
                support between {formatPct(incomePct * (1/.8))} and {formatPct(incomePct * (1/.75))} of your 
                estimated retirement income. Most financial experts recommend that plan to budget your 
                retirement based on 75%-80% of your current income - this includes income from all 
                sources including Social Security, IRAs and other investments not included here.
                Adjusted for inflation, your estimated annual distribution is the equivalent 
                of {formatCurrency(currentSalary * incomePct)} annually, 
                or {formatCurrency((currentSalary * incomePct) / 12)} monthly.
            </div>
            <div style={{marginTop: '8pt'}}>
                The estimates provided are base on a number of factors including average stock and bond market 
                performance<sup>[1]</sup> over the last 30 years, inflation over the same period, your investment profile, 
                as well as how much you contribute to your retirement during your active working years. The following are 
                some additional information about your retirement. 
                <br/>
                <table style={{marginTop: '24pt', width: "60%", border: "solid black 1pt", borderCollapse: "collapse"}}>
                    <tr>
                        <td><strong>Retirement funds will last until</strong></td>
                        <td>{retirementDepleteYear}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Distribution Amount ({distributionLengthYears} years)</strong></td>
                        <td>{formatCurrency(totalDistributions)}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Interest</strong></td>
                        <td>{formatCurrency(totalInterest)}</td>
                    </tr>
                    <tr>
                        <td><strong>Estimated Growth Rate<sup>[2]</sup></strong></td>
                        <td>{formatPct(weightedGrowthRate)}</td>
                    </tr>
                    <tr>
                        <td><strong>Estimated Inflation Rate<sup>[3]</sup></strong></td>
                        <td>{formatPct(inflationRate)}</td>
                    </tr>
                </table>
            </div>
            <div style={{marginTop: '32pt'}}>
                <div style={{fontSize: '8pt'}}>
                    [1] Stock market performance is analyzed over a 30 year period to estimate average year-over-year growth. 
                    Future performance may vary.
                </div>
                <div style={{fontSize: '8pt'}}>
                    [2] Estimated growth rate is calculated based on stock and bond market performance, and your
                    investment profile is factored in. The result is the estimate growth rate of your retirement
                    account during your working years. Again, past performance is not an indicator of future gain.
                </div>
                <div style={{fontSize: '8pt'}}>
                    [3] All retirement distributions are automatically adjusted annually using the average inflation 
                    rate over the last 20 years.  
                </div>
            </div>
        </Paper>
    );

};