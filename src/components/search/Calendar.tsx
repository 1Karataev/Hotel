import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import classes from './Search.module.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setDateValue, setOutValue } from '../../redux/Hotels';
import { styled } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    fontFamily: "Roboto",
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#424242',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#C9CACC',
    },
    '&:hover fieldset': {
      borderColor: '#C9CACC',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #C9CACC',
    },
  },
});

export default function Calendar() {
  const [value, setValue] = React.useState<Date | null>(null);
  const data = useSelector((store:RootState)=> store.hotels.date)
  const dispatch = useAppDispatch()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Дата заселения"
        value={value || data}
        onChange={(newValue:any) => {
          setValue(newValue);
          const dat = new Date(newValue ) .toLocaleDateString().split('.').reverse().join('-');
          dispatch(setDateValue(dat ));
          dispatch(setOutValue());
        }}
        renderInput={(params) => <CssTextField {...params} className={classes.celendar} />}
      />
    </LocalizationProvider>
  );
}
