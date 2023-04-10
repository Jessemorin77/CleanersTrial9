import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import UserStack from './src/navigation/UserStack';
import 'react-native-gesture-handler';
import { useAuth } from './src/hooks/useAuth';
import AuthStack from './src/navigation/AuthStack';

//Kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
//Paper
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const{ user } = useAuth();
  
  return (
    <PaperProvider>
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        {user ? <UserStack /> : <AuthStack />}
        <StatusBar style="auto" />
      </NavigationContainer>
    </ApplicationProvider>
    </PaperProvider>
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

