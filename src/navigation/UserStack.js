import DrawerContent from '../components/Drawer/DrawerComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { NavigationContainer, StackActions } from '@react-navigation/native';
//
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// Screens
import AddPropertyScreen from '../screens/AddPropertyScreen';
import CalendarScreen from '../screens/CalendarScreen';
import HomeScreen from '../screens/HomeScreen';
import PropertyScreen from '../screens/PropertyScreen';

//Job Request Screens
import JobRequestScreenSelect from '../screens/JobRequestScreens/JobRequestScreen-Select';
import JobRequestDateScreen from '../screens/JobRequestScreens/JobRequestDateScreen';
import JobRequestScreen1 from '../screens/JobRequestScreens/JobRequestScreen1';
import JobRequestScreen2 from '../screens/JobRequestScreens/JobRequestScreen2';
import JobRequestScreen3 from '../screens/JobRequestScreens/JobRequestScreen3';
import JobRequestScreen4 from '../screens/JobRequestScreens/JobRequestScreen4';

import { Ionicons } from '@expo/vector-icons';


const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
           
            </Stack.Navigator>
    );
};

const JobRequestStack = () => {
    return (
        <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="JobRequestScreenSelect"
      onBlur={(route) => {
        if (!route.state) {
          StackActions.reset({
            index: 0,
            routes: [{ name: 'JobRequestScreenSelect' }],
          });
        }
      }}
    >
            <Stack.Screen name="JobRequestScreenSelect" component={JobRequestScreenSelect} />
            <Stack.Screen name="JobRequestScreen1" component={JobRequestScreen1} />
            <Stack.Screen name="JobRequestScreen2" component={JobRequestScreen2} />
            <Stack.Screen name="JobRequestScreen3" component={JobRequestScreen3} />
            <Stack.Screen name="JobRequestScreen4" component={JobRequestScreen4} />
           
            </Stack.Navigator>
    );
};

const PropertyStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Property" component={PropertyScreen} />
            <Stack.Screen name="AddProperty" component={AddPropertyScreen} />

            </Stack.Navigator>
    );
};




const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Properties"
                component={PropertyStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="business-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Job Request"
                component={JobRequestStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="briefcase-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator 
        drawerContent={(props) => <DrawerContent {...props} />}
       
        >
            <Drawer.Screen name="TabNavigation" component={TabNavigation} options={{ title: "Cleaners for Owners" }}/>
            
            <Drawer.Screen name="Job Request" component={JobRequestStack} />
            

        </Drawer.Navigator>
    );
};

export default DrawerNavigation;