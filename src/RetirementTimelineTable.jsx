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
            if (retirementSchedule && retirementSchedule.value) {
                let rowSet = retirementSchedule.value.map(balanceItem => {
                    return createRow(balanceItem);
                });

                setRows(rowSet);
            }
        }
    },[retirementData])

    const createRow = (balanceItem) => {
        if (balanceItem) {
            let year = parseInt(balanceItem.year);
            let interest = formatCurrency(balanceItem.interestAccrued);
            let balance = formatCurrency(balanceItem.balance);
            let type = balanceItem.type;
            let transaction = 0.0;
            if (type === 'contribution') {
                let selfContribution = parseFloat(balanceItem.estimatedSelfContribution);
                let emplContribution = parseFloat(balanceItem.estimatedEmployerContribution);
                transaction = selfContribution + emplContribution;
                transaction = formatCurrency(transaction);
            } else { //there are only two types, so if not contribution, then distribution
                let distribution = parseFloat(balanceItem.annualDistributionAmount) * -1;
                transaction = formatCurrency(distribution);
            }

            let result = {};
            result.id = year;
            result.year = year;
            result.type = type;
            result.transactionAmount = transaction;
            result.interest = interest;
            result.balance = balance;
            return result;
        }
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

        let numberLen = formattedNumber.length;

        if (isNegative) {
            let numberVal = '$';
            for (let i = 0; i < (13 - (numberLen + 1)); i++) {
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
            width: 140,
            editable: false,
            renderCell: (params) => (<strong>{params.value}</strong>)
        },
        {
            field: 'type',
            headerName: 'Transaction Type',
            width: 200,
            editable: false,
        },
        {
            field: 'transactionAmount',
            headerName: 'Transaction Amount',
            width: 240,
            editable: false,
            type: 'number',
            
        },
        {
            field: 'interest',
            headerName: 'Interest',
            width: 200,
            editable: false,
            type: 'number'
        },
        {
            field: 'balance',
            headerName: 'Balance',
            width: 200,
            editable: false,
            type: 'number'
        }
    ];

    return (
        <div style={{height: 800, width: '85%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={20}/>
        </div>
    )
/*
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Transaction</TableCell>
                        <TableCell align="right">Interest</TableCell>
                        <TableCell align="right">Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.year}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.transactionAmount}</TableCell>
                            <TableCell align="right">{row.interest}</TableCell>
                            <TableCell align="right">{row.balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
*/
};