import React from 'react';
import {FormControl, InputLabel, NativeSelect} from '@material-ui/core'
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
        <NativeSelect
          value={number}
          onChange={e => setNumber(e.target.value)}
        >
          <option key={`optionnone`} value=''></option>
            {numberList.map(number => {
                return (<option key={`option${number}`} value={number}>{number}</option>)
            })}
        </NativeSelect>
      </FormControl>
        </div>
    );
};

export default DropDownList;