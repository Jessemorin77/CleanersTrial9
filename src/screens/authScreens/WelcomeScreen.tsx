import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Welcome</Text>
      {/* Add any other content you want in the WelcomeScreen */}
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('Sign In')}
        color={colorScheme === 'dark' ? '#fff' : '#007bff'}
      />
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
    marginBottom: 20,
  },
});

export default WelcomeScreen;

