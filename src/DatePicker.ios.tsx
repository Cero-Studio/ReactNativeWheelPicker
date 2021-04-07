import React, { useState } from "react";
import { View } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker"

interface Props {
  initDate: Date;
  onDateSelected?: Function;
  disabled?: boolean;
}

const DatePicker: React.FC<Props> = props => {
  const { initDate, onDateSelected, disabled } = props;
  const [date, setDate] = useState(initDate || new Date())
  return (
    <View pointerEvents={disabled ? "none" : "auto"}>
      <RNDateTimePicker
          value={date}
        onChange={(event, date) => {
          if (onDateSelected) onDateSelected(date)
          setDate(date)
        }}
        mode="date"
        {...props}
      />
    </View>
  );
};

export default DatePicker;
