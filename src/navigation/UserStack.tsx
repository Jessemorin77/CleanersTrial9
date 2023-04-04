import DrawerContent from '../components/Drawer/DrawerComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
//
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// Screens
import AddPropertyScreen from '../screens/AddPropertyScreen';
import CalendarScreen from '../screens/CalendarScreen';
import HomeScreen from '../screens/HomeScreen';
import JobSelectScreen from '../screens/JobSelectScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PropertyScreen from '../screens/PropertyScreen';
import InboxScreen from '../screens/InboxScreen';
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
           
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
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Properties" component={PropertyStack} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Inbox" component={InboxScreen} />

        </Tab.Navigator>
    );
};

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="TabNavigation" component={TabNavigation} options={{ title: "Cleaners for Owners" }}/>
            
            <Drawer.Screen name="Profile" component={ProfileScreen} />

        </Drawer.Navigator>
    );
};

export default DrawerNavigation;