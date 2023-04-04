import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';

const PropertiyScreen = ({ navigation }) => {
    const [properties, setProperties] = useState([]);

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

    const renderItem = ({ item }) => (
        <View style={styles.propertyItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.propertyImage} />
            <View style={styles.propertyDetails}>
                <Text style={styles.propertyTitle}>{item.address}</Text>
                <Text style={styles.propertyInfo}>{item.state}, {item.town}</Text>
                <Text style={styles.propertyInfo}>Type: {item.houseType}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProperty(item.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddProperty')}
            >
                <Text style={styles.addButtonText}>Add Property</Text>
            </TouchableOpacity>
            <FlatList
                data={properties}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

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
    },
    propertyInfo: {
        fontSize: 12,
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
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default PropertiyScreen
