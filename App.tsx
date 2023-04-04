import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import UserStack from './src/navigation/UserStack';
import 'react-native-gesture-handler';
import { useAuth } from './src/hooks/useAuth';
import AuthStack from './src/navigation/AuthStack';

export default function App() {
  const{ user } = useAuth();
  
  return (
    <NavigationContainer>
      {user ? <UserStack /> : <AuthStack />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

