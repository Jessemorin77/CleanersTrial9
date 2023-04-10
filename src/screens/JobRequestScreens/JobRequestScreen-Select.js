import React, {
    useState, 
    useEffect
} from 'react';

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

const JobRequestScreenSelect =({navigation}) => {

    const [properties, setProperties] = useState([]);
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

    const onRefresh = () => {
        setRefreshing(true);
        fetchProperties();
        setRefreshing(false);
    };

    function handleClick(id) {
        console.log(`Property ${id} clicked!`);
        // You can perform any necessary actions here, such as updating state
        navigation.navigate('JobRequestScreen1')
      }

       const renderItem = ({ item }) => (

        <TouchableOpacity
            style={styles.propertyItem}

            onPress={() => handleClick()}
        >
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
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Pick Property You Would Like to Clean</Text>
          <FlatList
            data={properties}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddProperty')}
          >
            <Text style={styles.addButtonText}>Add Property</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          </View>
        </View>
      );
      
}

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
            padding:20,
            width: 200,
            borderRadius: 5,
            marginBottom: 200,
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
        text: {
            fontSize: 23,
            marginBottom: 15,
            marginTop: 20,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        button: {
            backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 5,
        }
    });

export default JobRequestScreenSelect;