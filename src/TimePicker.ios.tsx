import React from "react";
import DatePicker from './DatePicker.ios'

interface Props {
  initDate: Date;
  onTimeSelected?: Function;
  disabled?: boolean;
}

const TimePicker: React.FC<Props> = props => {
  return (
    <DatePicker mode={'time'} {...props} onDateSelected={props.onTimeSelected}/>
  );
};

export default TimePicker;
