import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const DropDownList = ({number, numberList, setNumber}) => {
    const classes = useStyles();
    return (
        <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="estimateLabel">Estimate</InputLabel>
        <Select
          labelId="estimateSelectLAbel"
          id="estimateSelectLAbel"
          value={number}
          onChange={e => setNumber(e.target.value)}
        >
            {numberList.map(number => {
                return (<MenuItem value={number}>{number}</MenuItem>)
            })}
        </Select>
      </FormControl>
        </div>
    );
};

export default DropDownList;