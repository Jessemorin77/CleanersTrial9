import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PaperButton from '../../components/Buttons/PaperButton';

const JobRequestScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What kind of worker are you looking for?</Text>
      <View style={styles.buttonsContainer}>
        <PaperButton
          title="Independent"
          onPress={() => {
            // store user's selection
            navigation.navigate('JobRequestScreen3');
          }}
          size={300}
          style={styles.button}
        />
        <PaperButton
          title="Professional"
          onPress={() => {
            // store user's selection
            navigation.navigate('JobRequestScreen3');
          }}
          size={300}
          style={styles.button}
        />
        <PaperButton
          title="Company"
          onPress={() => {
            // store user's selection
            navigation.navigate('JobRequestScreen3');
          }}
          size={300}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 50,
    alignSelf: 'center'
  },
  buttonsContainer: {
    width: '90%',
    height: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
});

export default JobRequestScreen2;
