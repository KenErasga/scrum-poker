import React from 'react';
import { FormControl, InputLabel, NativeSelect, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropDownList = ({ estimate, numberList, setEstimate }) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="estimateLabel">Estimate</InputLabel>
        <NativeSelect
          value={estimate}
          onChange={e => setEstimate(e.target.value)}
        >
          {numberList.map(estimate => {
            return (<option key={`option-${estimate}`} value={estimate}>{estimate}</option>)
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default DropDownList;