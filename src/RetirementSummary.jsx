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

    const targetAnnualRetirementBudget = currentSalary * .8;
    const estimatedProvidedBudget = currentSalary * incomePct;
    const estimatedProvidedPct = incomePct * (1/.8);
    const estimatedShortfall = targetAnnualRetirementBudget - estimatedProvidedBudget;

    return (
        <div>
            <Paper style={{width: '95%', height: '80%', textAlign: 'left', padding: '4pt 4pt 2pt'}} hidden={retirementData!==null}>
                <div style={{marginTop: '8pt'}}>
                    <h3>Retirement Estimator</h3>
                    <p>
                        This calculator is for demonstration purposes only.
                    </p>
                    <table className={'helpguide'}>
                        <tr>
                            <td><strong>Age</strong></td>
                            <td>Enter your current age</td>
                        </tr>
                        <tr>
                            <td><strong>Retirement Age</strong></td>
                            <td>Enter the when you wish to retire</td>
                        </tr>
                        <tr>
                            <td><strong>Current Salary</strong></td>
                            <td>Enter your current salary</td>
                        </tr>
                        <tr>
                            <td><strong>Cost of Living Adjustment</strong></td>
                            <td>Enter the estimated annual increase for your current salary. We'll use this to 
                                model all of your working years. Typically COLA raises are between 2-3%.
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Current Retirement Balance</strong></td>
                            <td>Enter the current balance from your retirement account</td>
                        </tr>
                        <tr>
                            <td><strong>Self Contribution Pct</strong></td>
                            <td>Enter the percentage of your salary you want to contribute to your retirement account</td>
                        </tr>
                        <tr>
                            <td><strong>Employer Contribution Pct</strong></td>
                            <td>Enter the percentage of your salary your employer will contribute to your retirement account</td>
                        </tr>
                        <tr>
                            <td><strong>Post-retirement Interest Rate</strong></td>
                            <td>Estimate the interest you will accrue on your account during retirement. Don't worry about
                                inflation, we'll take care of that in your distribution calculations.
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Distribution Frequence</strong></td>
                            <td>Enter the value of how frequenly you wish to receive annual distributions</td>
                        </tr>
                        <tr>
                            <td><strong>Retirement Duration</strong></td>
                            <td>Enter the number of years you want your retirement to last.
                                If set to <code>0</code>, the calculator will estimate based on a set percentage 
                                of your retirement account distributed each year.
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Income Replacement Percentage</strong></td>
                            <td>If <em>Retirement Duration</em> is set to <code>0</code>,
                                then you can set the percentage of your last salary you wish to 
                                take annually.  Note that if <em>Retirement Duration</em> is set to any
                                value greater than <code>0</code>, it will take precedence over this value.
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Investment Profile</strong></td>
                            <td>Enter your tolerance for investment risk.  The higher the value, the higher the risk,
                                and potentially higher return (and loss) on investment.  The profile value is used
                                to create a <em>weighted growth rate</em> which uses current stock and bond rates
                                to estimate your investment growth over time.
                            </td>
                        </tr>
                    </table>
                </div>
            </Paper>
            <Paper style={{width: '80%', height: '80%', textAlign: 'left', padding: '4pt 4pt 2pt'}} hidden={retirementData===null}>
                <div style={{marginTop: '8pt'}}>
                    The estimates provided are base on a number of factors including average stock and bond market 
                    performance<sup>[1]</sup> over the last 30 years, inflation over the same period, your investment profile, 
                    as well as how much you contribute to your retirement during your active working years. The following are 
                    some additional information about your retirement. <em>These are only estimates, and do <u>not</u> imply 
                    actual values at retirement</em>.
                    <br/>
                    <h3>Summary</h3>
                    <table className={'summary'} style={{marginTop: '8pt', width: "60%", border: "solid black 1pt", borderCollapse: "collapse"}}>
                        <tr>
                            <td><strong>Retirement Year</strong></td>
                            <td>{retirementYear}</td>
                        </tr>
                        <tr>
                            <td><strong>Retirement Age</strong></td>
                            <td>{retirementAge}</td>
                        </tr>
                        <tr>
                            <td><strong>Working years before retirement</strong></td>
                            <td>{retirementYear - new Date().getFullYear()}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Self Contributions</strong></td>
                            <td>{formatCurrency(totalSelfContributions)}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Employer Contributions</strong></td>
                            <td>{formatCurrency(totalEmployerContributions)}</td>
                        </tr>
                        <tr>
                            <td><strong>Balance at Retirement</strong></td>
                            <td>{formatCurrency(balanceAtRetirement)}</td>
                        </tr>
                        <tr>
                            <td><strong>Estimated Total Annual Retirement Budget @ 80%</strong><sup>[2]</sup></td>
                            <td>{formatCurrency(targetAnnualRetirementBudget)}</td>
                        </tr>
                        <tr>
                            <td style={{paddingLeft: '24pt'}}><em>Annual Funding Provided By this Account</em></td>
                            <td><em>{formatCurrency(estimatedProvidedBudget)}</em></td>
                        </tr>
                        <tr>
                            <td style={{paddingLeft: '24pt'}}><em>Percentage of Retirement Funding</em></td>
                            <td><em>{formatPct(estimatedProvidedPct)}</em></td>
                        </tr>
                        <tr>
                            <td style={{paddingLeft: '24pt'}}><em>Annual Retirement Funding Shortfall</em></td>
                            <td><em>{estimatedShortfall > 0 ? formatCurrency(estimatedShortfall) : '-'}</em></td>
                        </tr>
                        <tr>
                            <td><strong>Estimated Retirement Fund Duration</strong></td>
                            <td>{distributionLengthYears} years</td>
                        </tr>
                        <tr>
                            <td><strong>Retirement funds will last until</strong></td>
                            <td>{retirementDepleteYear} (Age {retirementAge + distributionLengthYears})</td>
                        </tr>
                        <tr>
                            <td><strong>Total Distribution Amount ({distributionLengthYears} years) </strong></td>
                            <td>{formatCurrency(totalDistributions)}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Interest</strong></td>
                            <td>{formatCurrency(totalInterest)}</td>
                        </tr>
                        <tr>
                            <td><strong>Estimated Growth Rate<sup>[3]</sup></strong></td>
                            <td>{formatPct(weightedGrowthRate)}</td>
                        </tr>
                        <tr>
                            <td><strong>Estimated Inflation Rate<sup>[4]</sup></strong></td>
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
                        [2] Based on your current salary. Distribution amounts are calculated in current year amounts.
                        Most financial advisors recommend your retirement income replace 80% of your working income 
                        from all income sources, including Social Security, IRAs, and other investments you may have and not included here.
                        This estimate is used as a guage how prepared you will be for retirement. Nevertheless, consult a 
                        professional, trusted financial advisor about your particular situation and strategies for retirement.
                    </div>

                    <div style={{fontSize: '8pt'}}>
                        [3] Estimated growth rate is calculated based on stock and bond market performance, and your
                        investment profile is factored in. The result is the estimate growth rate of your retirement
                        account during your working years. Again, past performance is not an indicator of future gain.
                    </div>
                    <div style={{fontSize: '8pt'}}>
                        [4] All retirement distributions are automatically adjusted annually using the average inflation 
                        rate over the last 20 years.  
                    </div>
                </div>
            </Paper>
        </div>

    );

};