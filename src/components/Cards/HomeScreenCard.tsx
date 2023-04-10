import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';

const users = [
{
  name: 'Private Cleaner',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
},
{
  name: 'Contractors',
  avatar:
    'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
},
{
  name: 'Cleaning Companies',
  avatar: 'https://lh3.googleusercontent.com/proxy/b-HSf12wR4B7Bd4ahNhXYD4k50L58hcsLz4DRywblxedG51RTaS7sUnGfryI0VYhYtVhASQ5YK-cHZTauC4a7A0GthoiIDy6zlokHlzivC9kVtNleBMGhDCh2iZzbW83511AgMrS_rGS9gq8TcAKYPgI9aZz6AdEqWVRfMmEtH3J=w1200-h630-p-k-no-nu',
},

];

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
  const navigation = useNavigation();
return (
  
  <>
    <ScrollView>
      <View style={styles.container}>
      <Card>
          <Card.Title>Schedule With Our Cleaners Today!</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://www.cleanlink.com/resources/editorial/2021/cleaning-staff-26492.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            Find cleaners for any size project
          </Text>
          <Button
          onPress={() => navigation.navigate('JobRequestScreenSelect')}
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
                
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="SCHEDULE NOW"
          />
        </Card>

        <Card>
          <Card.Title>Add Property to Profile</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
            }}
          />
          <Text style={{ marginBottom: 10 }}>
            Add your Properties to get started!
          </Text>
          <Button
          onPress={() => navigation.navigate('Properties')}
            icon={
              <Icon
                name="code"
                color="#ffffff"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Add Property"
          />
        </Card>


        <Card>
          <Card.Title>Available Services</Card.Title>
          <Card.Divider />
          {users.map((u, i) => {
            return (
              <View key={i} style={styles.user}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                />
                <Text style={styles.name}>{u.name}</Text>
              </View>
            );
          })}
        </Card>
        <Card containerStyle={{ marginTop: 15 }}>
          <Card.Title>FEATURES</Card.Title>
          <Card.Divider />
          <Text style={styles.fonts} h3>
            1. Add Properties
          </Text>
          <Text style={styles.fonts} h3>
            2. Select Property to Clean
          </Text>
          <Text style={styles.fonts} h3>
            3. Post Listing
          </Text>
          <Text style={styles.fonts} h3>
            4. Choose from your bids
          </Text>
          <Text style={styles.fonts} h3>You are now all set!</Text>
        </Card>
        
      </View>
    </ScrollView>
  </>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
    
},
fonts: {
  marginBottom: 8,
},
user: {
  flexDirection: 'row',
  marginBottom: 6,
},
image: {
  width: 30,
  height: 30,
  marginRight: 10,
},
name: {
  fontSize: 16,
  marginTop: 5,
},
});

export default Cards;