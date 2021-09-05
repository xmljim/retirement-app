import logo from './logo.svg';
import './App.css';
import { RetirementForm } from './RetirementForm';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { RetirementTimelineTable } from './RetirementTimelineTable';
import { RetirementTabs } from './RetirementTabs';
import 'react-tabs/style/react-tabs.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginRight: '8pt'
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


function App() {
    const classes = useStyles();
    const [retirementData, setRetirementData] = useState(null);
    const [modelName, setModelName] = useState('Hello')

    useEffect(() => {
        if (retirementData && retirementData.modelName) {
            setModelName(retirementData.modelName);
        }
    }, [retirementData]);


    return (
        <div className="App">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper style={{marginLeft: '12pt', paddingTop: '8pt', paddingBottom: '12pt'}}>
                            <RetirementForm onDataUpdate={setRetirementData}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} >
                        <Paper style={{marginTop: '24pt', paddingRight: '12pt'}}>
                            <RetirementTabs retirementData={retirementData}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>


        </div>
    );
}

export default App;
