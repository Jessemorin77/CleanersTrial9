import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getAuth, signOut} from 'firebase/auth';

export default function DrawerContent(props) {
   const auth = getAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        }catch(error) {
            console.error('Error signing out', error )
        }
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerHeader}>
                    <Icon name="menu" size={24} />
                    <Text style={styles.drawerHeaderText}>CleanBNB</Text>
                </View>
                <DrawerItem
                    label="Home"
                    icon={({ color, size }) => <Icon name="home" color={color} size={size} />}
                    onPress={() => props.navigation.navigate('Home')}
                />
                <DrawerItem
                    label="Sign Out"
                    icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
                    onPress={handleSignOut}
                    />

            </DrawerContentScrollView>
            <View style={styles.drawerFooter}>
                <Text style={styles.drawerFooterText}>My App v1.0.0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#008080', // Add custom background color here
    },
    drawerHeaderText: {
      marginLeft: 10,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff', // Add custom text color here
    },
    drawerFooter: {
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      padding: 10,
    },
    drawerFooterText: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
  });
  
