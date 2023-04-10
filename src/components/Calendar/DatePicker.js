import React, { useState } from 'react';
import { View, Text, DatePickerIOS } from 'react-native';

const RangeDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  return (
    <View>
      <Text>Start Date:</Text>
      <DatePickerIOS
        date={startDate}
        onDateChange={handleStartDateChange}
        mode="date"
      />
      <Text>End Date:</Text>
      <DatePickerIOS
        date={endDate}
        onDateChange={handleEndDateChange}
        mode="date"
      />
      <Text>{startDate.toDateString()} - {endDate.toDateString()}</Text>
    </View>
  );
};

export default RangeDatePicker;

