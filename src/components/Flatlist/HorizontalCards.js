import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const CARD_DATA = [
  { id: 1, title: 'Independent' },
  { id: 2, title: 'Professional' },
  { id: 3, title: 'Company' },
];

const Card = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const CardList = ({ onSelect }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelect = (card) => {
    setSelectedCard(card.id);
    onSelect(card.title);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedCard === item.id;

    return (
      <Card
        title={item.title}
        onPress={() => handleSelect(item)}
        style={[styles.card, isSelected && styles.selectedCard]}
      />
    );
  };

  return (
    <FlatList
      data={CARD_DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedCard: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
});

export default CardList;
