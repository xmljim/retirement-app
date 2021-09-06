import { FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, Slider, Button, Tooltip } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import Services from './Services'

export const RetirementForm = ({onDataUpdate}) => {

    const [age, setAge] = useState(0);
    const [retirementAge, setRetirementAge] = useState(65);
    const [currentSalary, setCurrentSalary] = useState(0.0);
    const [colaPct, setColaPct] = useState(0.0);
    const [currentRetirementBalance, setCurrentRetirementBalance] = useState(0.0);
    const [selfContributionPct, setSelfContributionPct] = useState(0.0);
    const [employerContributionPct, setEmployerContributionPct] = useState(0.0);
    const [investmentStyle, setInvestmentStyle] = useState(.7);
    const [postRetirementInterestRate, setPostRetirementInvestmentRate] = useState(0.04);
    const [distributionFrequency, setDistributionFrequency] = useState('MONTHLY');
    const [retirementDuration, setRetirementDuration] = useState(0);
    const [incomeReplacementPct, setIncomeReplacementPct] = useState(0);
    const [investmentProfile, setInvestmentProfile] = useState('Moderate');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(age === 0 || retirementAge === 0 || currentSalary === 0 || currentRetirementBalance === 0)
    },[age, retirementAge, currentSalary, currentRetirementBalance]);

    const onInvestmentStyleChange = (event, value) => {
        let thresholds = [
            {
                min: 0,
                max: 19,
                label: 'Very Conservative'
            },
            {
                min: 20,
                max: 39,
                label: 'Conservative'
            },
            {
                min: 40,
                max: 54,
                label: 'Moderate Conservative'
            },
            {
                min: 55,
                max: 69,
                label: 'Moderate'
            },
            {
                min: 70,
                max: 79,
                label: 'Moderate Agressive'
            },
            {
                min: 80,
                max: 94,
                label: 'Aggressive'
            },
            {
                min: 95,
                max: 100,
                label: 'Very Aggressive'
            }
        ];

      
        
        let profile = thresholds.filter(t => value >= t.min && value <= t.max)[0];
  
        setInvestmentProfile(profile.label);
        setInvestmentStyle(toPercent(value));
    };

    const onSubmit = (e) => {
        

        e.preventDefault();
        
        let payload = {
            age,
            retirementAge,
            currentSalary,
            colaPct,
            currentRetirementBalance,
            selfContributionPct,
            employerContributionPct,
            investmentStyle,
            postRetirementInterestRate,
            distributionFrequency,
            retirementDuration,
            incomeReplacementPct
        }


        Services.calculateRetirement(payload, onDataUpdate);
        
    }; 

    const toInt = (value) => {
        if (value !== Number.NaN) {
            let newInt = parseInt(value);
            return newInt;
        } else {
            return 0;
        }
    }

    const toPercent = (value) => {
        return parseInt(value) / 100;
    };

    const toCurrency = (value) => {
        console.log("toCurrency", value);
        let currency = parseFloat(value);
        
        return currency;
    };

    const onKeyPressEvent = (e) => {
        if (e.code === 'Enter') {
            if (!disabled) {
                onSubmit(e);
            }
        }
    }

    return (
        <div style={{textAlign: 'left', marginTop: '24pt', marginLeft: '12pt'}} onKeyPress={e => onKeyPressEvent(e)}>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Age</InputLabel>
                    <Input type="number" defaultValue={age} onChange={(e, value) => setAge(toInt(e.target.value))}></Input>
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Retirement Age&nbsp;&nbsp;
                        <Tooltip title="Age you wish to retire"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={retirementAge} 
                        onChange={(e, value) => setRetirementAge(toInt(e.target.value))}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <CurrencyTextField key={'currentSalary-1'} label='Current Salary' 
                        defaultValue={currentSalary}
                        onChange={(e, value) => setCurrentSalary(value)}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Cost of Living Adjustment&nbsp;&nbsp; 
                        <Tooltip title="Estimate the average annual salary increase"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={colaPct} onChange={(e) => setColaPct(toPercent(e.target.value))}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        inputProps={{
                            step: "1",
                            lang: "en-US"
                        }}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <CurrencyTextField key={'currentRetirement-1'} label='Current Retirement Balance' 
                        defaultValue={currentRetirementBalance}
                        onChange={(e,value) => setCurrentRetirementBalance(value)}
                        
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Self Contribution Pct&nbsp;&nbsp;
                        <Tooltip title="Percentage of salary to contribute to retirement"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={selfContributionPct} 
                        onChange={e => setSelfContributionPct(toPercent(e.target.value))}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        inputProps={{
                            step: "1",
                            lang: "en-US"
                        }}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '12pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Employer Contribution Pct&nbsp;&nbsp;
                        <Tooltip title="Percentage of salary employer will contribute to retirement"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={employerContributionPct} 
                        onChange={e => setEmployerContributionPct(toPercent(e.target.value))}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        inputProps={{
                            step: "1",
                            lang: "en-US"
                        }}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '12pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Post-retirement Interest Rate&nbsp;&nbsp;
                        <Tooltip title="Estimate average interest rate on retirement value after retirement"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={postRetirementInterestRate * 100} 
                        onChange={e => setPostRetirementInvestmentRate(toPercent(e.target.value))}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        inputProps={{
                            step: "1",
                            lang: "en-US"
                        }}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Distribution Frequency&nbsp;&nbsp;
                        <Tooltip title="Annual frequency for retirement distributions"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Select defaultValue={distributionFrequency} onChange={e => setDistributionFrequency(e.target.value)}>
                        <MenuItem value='ANNUAL'>Annual</MenuItem>
                        <MenuItem value='SEMI_ANNUAL'>Semi-Annual</MenuItem>
                        <MenuItem value='QUARTERLY'>Quarterly</MenuItem>
                        <MenuItem value='MONTHLY'>Monthly</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Retirement Duration&nbsp;&nbsp;
                        <Tooltip title="Set if you want to calculate distributions on a fixed retirement duration"><HelpIcon color='primary'/></Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={retirementDuration} onChange={e => setRetirementDuration(parseInt(e.target.value))}
                        endAdornment={<InputAdornment position="end">Years</InputAdornment>}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <InputLabel>Income Replacement Percentage&nbsp;&nbsp;
                        <Tooltip 
                            title="The percentage of the last salary to use for distributions. Set only if you wish to override default distribution calculation.">
                                <HelpIcon color='primary'/>
                        </Tooltip>
                    </InputLabel>
                    <Input type="number" defaultValue={incomeReplacementPct} 
                        onChange={e => setIncomeReplacementPct(toPercent(parseFloat(e.target.value) === NaN ? 0 : parseFloat(e.target.value)))}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        inputProps={{
                            step: "1",
                            lang: "en-US"
                        }}
                    />
                </FormControl>
            </div>
            <div style={{marginTop: '10pt'}}>
                <FormControl style={{width: '240pt'}}>
                    <Typography id="input-slider" gutterBottom style={{fontSize: '10pt'}}>
                        Investment Profile: {`${investmentStyle * 100}`} ({investmentProfile})
                    </Typography>
                    <Slider key={'slider-investmentStyle'} 
                        defaultValue={investmentStyle * 100}
                        onChange={(event, value) => onInvestmentStyleChange(event, value)}></Slider>
                </FormControl>
            </div>
            <Button variant="contained" disabled={disabled} color="primary" style={{width: '240pt', marginTop: '12pt'}} onClick={e => onSubmit(e)}>
                Calculate Retirement Estimates
            </Button>
        </div>
    );

};