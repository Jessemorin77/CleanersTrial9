import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    Button,
    RefreshControl
} from 'react-native';

import { getAuth } from 'firebase/auth';

import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';

import PaperButton from '../components/Buttons/PaperButton';

const PropertyScreen = ({ navigation }) => {
    const [properties, setProperties] = useState([]);
    const [expandedItem, setExpandedItem] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userPropertiesRef = collection(db, 'users', userId, 'properties');
            const q = query(userPropertiesRef);
            const querySnapshot = await getDocs(q);

            const propertyList = [];
            querySnapshot.forEach((doc) => {
                propertyList.push({ id: doc.id, ...doc.data() });
            });

            setProperties(propertyList);
        } catch (error) {
            console.error('Error fetching properties:', error);
            alert('An error occurred while fetching the properties. Please try again.');
        }
    };

    const deleteProperty = async (propertyId) => {
        try {
            const userId = auth.currentUser.uid;
            const propertyRef = doc(db, 'users', userId, 'properties', propertyId);
            await deleteDoc(propertyRef);
            fetchProperties();
            alert('Property deleted successfully');
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('An error occurred while deleting the property. Please try again.');
        }
    };

    const toggleExpansion = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchProperties();
        setRefreshing(false);
    };

    const renderButton1 = (itemId) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Button 1 pressed for item:', itemId)}
        >
            <Text>Schedule Cleaning</Text>
        </TouchableOpacity>
    );

    const renderButton2 = (itemId) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Button 2 pressed for item:', itemId)}
        >
            <Text>Edit Property</Text>
        </TouchableOpacity>
    );

    const renderButton3 = (itemId) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Button 3 pressed for item:', itemId)}
        >
            <Text>Button 3</Text>
        </TouchableOpacity>
    );

    

    const renderItem = ({ item }) => (

        <TouchableOpacity
            style={styles.propertyItem}

            onPress={() => toggleExpansion(item.id)}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.propertyImage} />
            <View style={styles.propertyDetails}>
                <Text style={styles.propertyTitle}>{item.address}</Text>
                <Text style={styles.propertyInfo}>{item.state}, {item.town}</Text>
                <Text style={styles.propertyInfo}>Type: {item.houseType}</Text>
                {expandedItem === item.id && (
                    <View style={styles.dropdown}>
                        <View style={styles.row}>
                            {renderButton1(item.id)}
                            {renderButton2(item.id)}
                            
                        </View>
                    </View>
                )}
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProperty(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
    
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            paddingHorizontal: 20,
        },
        propertyItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
        },
        propertyImage: {
            width: 60,
            height: 60,
            borderRadius: 30,
        },
        propertyDetails: {
            flex: 1,
            marginLeft: 10,
        },
        propertyTitle: {
            fontWeight: 'bold',
            fontSize: 18
        },
        propertyInfo: {
            fontSize: 15,

        },
        deleteButton: {
            backgroundColor: '#FF0000',
            padding: 5,
            borderRadius: 5,
        },
        deleteButtonText: {
            color: '#fff',
            textAlign: 'center',
        },
        addButton: {
            backgroundColor: '#007BFF',
            padding:10,
            borderRadius: 5,
            marginBottom: 10,
            alignSelf: 'center',
        },
        addButtonText: {
            color: '#fff',
            textAlign: 'center',
        },
        dropdown: {
            backgroundColor: '#f2f2f2',
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
        },
        actionButton: {
            paddingVertical: 5,
            paddingHorizontal: 10,
        },
        actionButtonText: {
            color: '#007BFF',
            fontWeight: 'bold',
        },
        button: {
            backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 5,
        }
    });

    return (
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddProperty')}
            >
              <Text style={styles.addButtonText}>Add Property</Text>
            </TouchableOpacity>
          }
          ListFooterComponent={
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <PaperButton
                onPress={() => navigation.navigate('Job Request')}
                title="Schedule Cleaning"
                size={300}
              />
            </View>
          }
        />
      );
        }
export default PropertyScreen
