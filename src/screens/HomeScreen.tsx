import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

//Components
import SwitchComponent from '../components/SearchBar/SearchBar';
import Cards from '../components/Cards/HomeScreenCard';
import CardList from '../components/Flatlist/HorizontalCards';
import RangeDatePicker from '../components/Calendar/DatePicker';

const HomeScreen = () => {
  return (
    <ScrollView>
 <View style={styles.container}>
        
        <SwitchComponent />
        
        <Cards />
        
    </View>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;