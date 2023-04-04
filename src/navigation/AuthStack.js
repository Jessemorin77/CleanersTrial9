import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Intro from '../screens/authScreens/Intro';
import WelcomeScreen from '../screens/authScreens/WelcomeScreen';
import SignIn from '../screens/authScreens/SignIn';
import SignUp from '../screens/authScreens/SignUp';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (

            <Stack.Navigator
                screenOptions={{
                    
                    headerShown: false
                }}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Sign In" component={SignIn} />
                <Stack.Screen name="Sign Up" component={SignUp} />
            </Stack.Navigator>

    );
}