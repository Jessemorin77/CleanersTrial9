import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwitchComponent from '../../components/SearchBar/SearchBar';
import CategoryList from '../../components/Flatlist/CategoryList';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const JobRequestScreen1 = () => {
  const navigation = useNavigation();

  const categories = [
    {
      title: 'Job Type:',
      data: [
        { title: 'Interior Home', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Interior Home' }) },
        { title: 'Exterior Home', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Exterior Home' }) },
        { title: 'Property Cleanup', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Property Cleanup' }) },
        { title: 'Maid Services', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Maid Services' }) },
        { title: 'Windows', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Windows' }) },
        { title: 'Carpets and Draperies', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Carpets and Draperies' }) },
        { title: 'Ducts and Vents', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Ducts and Vents' }) },
        { title: 'Maid Services', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Maid Services' }) },
        { title: 'Post-Contruction Cleanup', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Post-Contruction Cleanup' }) },
        { title: 'Waste Material and Junk Removal', onPress: () => navigation.navigate('JobRequestScreen2', { jobType: 'Waste Material and Junk Removal' }) },
      ],
    },
    
  ];

  return (
    <View style={styles.container}>
      
      <ScrollView>
        <CategoryList categories={categories} />
      </ScrollView>
    </View>
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

export default JobRequestScreen1;
