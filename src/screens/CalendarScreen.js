import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CalendarComponent from '../components/Calendar/Calendar';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      
      <CalendarComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;