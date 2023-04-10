import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

const CategoryList = ({ categories }) => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
         
            {category.data.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} onPress={item.onPress}>
                <View style={styles.dataItemContainer}>
                  <Text style={styles.dataItemTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  dataItemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dataItemTitle: {
    fontSize: 25,
  },
});

export default CategoryList;
