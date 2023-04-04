import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const AddPropertyScreen = ({ navigation }) => {
    const [propertyData, setPropertyData] = useState({
        image: null,
        address: '',
        state: '',
        town: '',
        houseType: '',
        //area code

    });

    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedAsset = result.assets[0]; // Access the first selected asset
            setPropertyData({ ...propertyData, image: selectedAsset.uri });
        }
    };

    const addProperty = async () => {
        try {
            if (!propertyData.image) {
                alert('Please upload an image');
                return;
            }

            const userId = auth.currentUser.uid;
            console.log('User ID:', userId);

            const propertyRef = doc(db, 'users', userId, 'properties', new Date().getTime().toString());
            console.log('Property Ref:', propertyRef);

            const storageRef = ref(storage, `users/${userId}/properties/${propertyRef.id}`);
            console.log('Storage Ref:', storageRef);

            const response = await fetch(propertyData.image);
            console.log('Fetch Response:', response);

            const blob = await response.blob();
            console.log('Blob:', blob);

            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);
            console.log('Image URL:', imageUrl);

            await setDoc(propertyRef, {
                imageUrl,
                address: propertyData.address,
                state: propertyData.state,
                town: propertyData.town,
                houseType: propertyData.houseType,
            });

            alert('Property added successfully');
            setPropertyData({ image: null, address: '', state: '', town: '', houseType: '' });
        } catch (error) {
            console.error('Error while adding property:', error);
            alert('An error occurred while adding the property. Please try again.');
        }
    };



    return (
       <KeyboardAvoidingView
           style={{ flex: 1 }}
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
       >
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Text>Add Property</Text>
            {propertyData.image && (
                <Image source={{ uri: propertyData.image }} style={{ width: 200, height: 200 }} />
            )}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={propertyData.address}
                onChangeText={(text) => setPropertyData({ ...propertyData, address: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                value={propertyData.state}
                onChangeText={(text) => setPropertyData({ ...propertyData, state: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Town"
                value={propertyData.town}
                onChangeText={(text) => setPropertyData({ ...propertyData, town: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="House Type"
                value={propertyData.houseType}
                onChangeText={(text) => setPropertyData ({ ...propertyData, houseType: text })}
            />
            <TouchableOpacity style={styles.button} onPress={addProperty}>
                <Text style={styles.buttonText}>Add Property</Text>
            </TouchableOpacity>
            <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Properties')}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Add Property</Text>
                </View>
            </TouchableHighlight>
        </View>
           </ScrollView>
       </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default AddPropertyScreen;