import React, { useState } from 'react';
import { SearchBar, lightColors } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

type SearchBarComponentProps = {};

const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
const [search, setSearch] = useState("");

const updateSearch = (search: string) => {
  setSearch(search);
};

return (
  <View style={styles.view}>
    <SearchBar
      placeholder="Search..."
      onChangeText={updateSearch}
      value={search}
      
    />
  </View>
);
};

const styles = StyleSheet.create({
view: {
  margin: 10,
  width: 400,
  borderRadius: 20,
  padding: 10
},
});

export default SwitchComponent;