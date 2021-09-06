import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@material-ui/data-grid'


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export const RetirementTimelineTable = ({retirementData}) => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (retirementData && retirementData.coefficients) {
            let retirementSchedule = retirementData.coefficients.find(coeff => coeff.name === 'retirementSchedule');
            let currentAgeParam = retirementData.parameters.find(param => param.name === 'currentAge');
            if (retirementSchedule && retirementSchedule.value) {
                let rowSet = retirementSchedule.value.map(balanceItem => {
                    return createRow(balanceItem, currentAgeParam.value);
                });

                setRows(rowSet);
            }
        }
    },[retirementData])

    const createRow = (balanceItem, currentAge) => {
        let currentYear = new Date().getFullYear();
        console.log({currentYear, currentAge});
        let yearDelta = balanceItem.year - currentYear;
        let age = currentAge + yearDelta;
        if (balanceItem) {
            let year = parseInt(balanceItem.year);
            let interest = formatCurrency(balanceItem.interestAccrued);
            let balance = formatCurrency(balanceItem.balance);
            let type = balanceItem.type;
            let transaction = 0.0;
            let selfContribDisplay = '-';
            let emplContribDisplay = '-'
            if (type === 'contribution') {
                let selfContribution = parseFloat(balanceItem.estimatedSelfContribution);
                let emplContribution = parseFloat(balanceItem.estimatedEmployerContribution);
                transaction = selfContribution + emplContribution;
                transaction = formatCurrency(transaction);
                selfContribDisplay = formatCurrency(balanceItem.estimatedSelfContribution);
                emplContribDisplay = formatCurrency(balanceItem.estimatedEmployerContribution);
            } else { //there are only two types, so if not contribution, then distribution
                let distribution = parseFloat(balanceItem.annualDistributionAmount) * -1;
                transaction = formatCurrency(distribution);
                let setContribu
            }

            let result = {};
            result.id = year;
            result.year = year;
            result.age = age;
            result.type = toTitleCase(type);
            result.selfContribution = selfContribDisplay;
            result.employerContribution = emplContribDisplay;
            result.transactionAmount = transaction;
            result.interest = interest;
            result.balance = balance;
            return result;
        }
    }

    const toTitleCase = (str) => {
        let char0 = str.charAt(0).toUpperCase();
        let rest = str.substring(1);
        return char0 + rest;
    };

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

        let numberLen = formattedNumber.length;

        if (isNegative) {
            let numberVal = '$';
            for (let i = 0; i < (13 - (numberLen )); i++) {
                numberVal += '\u00A0';
            }
            numberVal += '('
            numberVal += formattedNumber;
            numberVal += ')';
            return numberVal;
        } else {
            let numberVal = '$';
            numberVal += '\u00A0';
            for (let i = 0; i < (13 - numberLen); i++) {
                numberVal += '\u00A0';
            }
            numberVal += formattedNumber;
            numberVal += '\u00A0';
            return numberVal;
        }
    };

    const columns = [
        {
            field: 'id',
            hide: true,
        },
        {
            field: 'year',
            headerName: 'Year',
            width: 110,
            editable: false,
            renderCell: (params) => (<strong>{params.value}</strong>)
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 110,
            editable: false,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 120,
            editable: false,
        },
        {
            field: 'selfContribution',
            headerName: 'Self',
            width: 140,
            editable: false,
            hide: false,
            type: 'number',
            renderCell: (params) => (<span style={{fontFamily: 'Consolas, Menlo', fontSize: '9pt'}}>{params.value}</span>),
        },
        {
            field: 'employerContribution',
            headerName: 'Employer',
            width: 140,
            editable: false,
            hide: false,
            type: 'number',
            renderCell: (params) => (<span style={{fontFamily: 'Consolas, Menlo', fontSize: '9pt'}}>{params.value}</span>),
        },
        {
            field: 'transactionAmount',
            headerName: 'Amount',
            width: 140,
            editable: false,
            type: 'number',
            renderCell: (params) => (<span style={{fontFamily: 'Consolas, Menlo', fontSize: '9pt'}}>{params.value}</span>),
            
        },
        {
            field: 'interest',
            headerName: 'Interest',
            width: 200,
            editable: false,
            type: 'number',
            renderCell: (params) => (<span style={{fontFamily: 'Consolas, Menlo', fontSize: '9pt'}}>{params.value}</span>),
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 200,
            editable: false,
            renderCell: (params) => (<span style={{fontFamily: 'Consolas, Menlo', fontSize: '9pt'}}>{params.value}</span>),
            type: 'number'
        }
    ];

    return (
        <div style={{height: 720, width: '95%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={25} rowHeight={25} headerHeight={26}
                />
        </div>
    )

};