import React from 'react';
import { View, Text, StyleSheet, Button, StatusBar, SafeAreaView, ScrollView, Image, Dimensions, PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Intro = () => {
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    
    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);
        if (indexOfNextScreen !== currentPage) {
          setSliderState({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
      };
    
      const { currentPage: pageIndex } = sliderState;
    

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            horizontal={true}
            scrollEventThrottle={16}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
          >
            <View style={{ width, height }}>
            <Image source={{
              uri:
                'https://www.cleanlink.com/resources/editorial/2021/cleaning-staff-26492.jpg',
            }} style={styles.imageStyle} />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Welcome to CleanBNB!</Text>
                <Text style={styles.paragraph}>Connecting Airbnb Owners with Top-Notch Cleaning Professionals, contractors and independent workers.
</Text>
              </View>
            </View>
            <View style={{ width, height }}>
            <Image source={{
              uri:
                'https://thumbs.dreamstime.com/b/magnifying-glass-over-map-showing-london-4908161.jpg',
            }} style={styles.imageStyle} />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Customizable Cleaning Services</Text>
                <Text style={styles.paragraph}>Choose the perfect cleaner for your property based on their skills and experience.
</Text>
              </View>
            </View>
            <View style={{ width, height }}>
            <Image source={{
              uri:
                'https://www.printablee.com/postpic/2012/09/housekeeping-cleaning-checklist_45980.jpg',
            }} style={styles.imageStyle} />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Streamlined Scheduling</Text>
                <Text style={styles.paragraph}>Effortlessly manage appointments with a built-in calendar and smart notifications.
</Text>
              </View>
            </View>
            <View style={{ width, height }}>
            <Image source={{
              uri:
                'data:image/png;base64,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',
            }} style={styles.imageStyle} />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Seamless Communication</Text>
                <Text style={styles.paragraph}>Stay in touch with your cleaners via our secure messaging platform.
</Text>
              </View>
            </View>
            <View style={{ width, height }}>
              
              <View style={styles.wrapper}>
              <Image source={{
              uri:
                'https://assets.materialup.com/uploads/c3056633-7f11-4053-aee8-01a04be6e67f/preview.png',
            }} style={styles.imageStyle} />
                <Text style={styles.header}>Get Started Today!</Text>
                <Text style={styles.paragraph}>Sign up now and elevate your Airbnb property management experience.</Text>
                <View style={styles.button}>
                <Button 
        title="Sign In"

        onPress={() => navigation.navigate('Sign In')}
        
      />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
        </SafeAreaView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    imageStyle: {
      height: PixelRatio.getPixelSizeForLayoutSize(135),
      width: '100%',
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 20,
      justifyContent: 'center',
      
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 100
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#0898A0',
        marginLeft: 10,
      },
  });

  export default Intro;