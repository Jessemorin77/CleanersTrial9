import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const JobRequestScreen3 = () => {
  const [cleaningType, setCleaningType] = useState('');
  const navigation = useNavigation();

  const handleOneTimeCleaningPress = () => {
    setCleaningType('One-Time Cleaning');
    navigation.navigate('JobRequestScreen4');
  };

  const handleRecurringServicePress = () => {
    setCleaningType('Recurring Service');
    navigation.navigate('JobRequestScreen4');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What type of Cleaning is needed?</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleOneTimeCleaningPress}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          One-Time Cleaning
        </Button>
        <Button
          mode="contained"
          onPress={handleRecurringServicePress}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Recurring Service
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
  },
  button: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default JobRequestScreen3;
