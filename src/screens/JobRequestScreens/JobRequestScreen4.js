import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const JobRequestScreen4 = ({ navigation }) => {
  const [status, setStatus] = useState('');

  const handleStatus = (status) => {
    setStatus(status);
  };

  const handleUploadListing = () => {
    // Code to upload the listing
    navigation.navigate('JobRequestScreenSelect');
    alert('Listing Posted');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appropriate Status</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode={status === 'Planning and Budgeting' ? 'contained' : 'outlined'}
          style={styles.button}
          onPress={() => handleStatus('Planning and Budgeting')}
        >
          Planning and Budgeting
        </Button>
        <View style={styles.separator} />
        <Button
          mode={status === 'Ready to Hire' ? 'contained' : 'outlined'}
          style={styles.button}
          onPress={() => handleStatus('Ready to Hire')}
        >
          Ready to Hire
        </Button>
      </View>
      <Button style={styles.uploadButton} onPress={handleUploadListing}>
        Upload Listing
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    
    alignItems: 'center',
    height: '70%',
    width: '80%',
  },
  button: {
    width: '100%',
    height: 70,
  },
  separator: {
    width: '5%',
  },
  uploadButton: {
    marginTop: 20,
  },
});

export default JobRequestScreen4;
