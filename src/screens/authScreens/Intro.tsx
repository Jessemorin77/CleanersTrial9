import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Button, Dimensions, GestureResponderEvent, Image, NativeScrollEvent, NativeSyntheticEvent, PixelRatio, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

function Intro() {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { currentPage: pageIndex } = sliderState;
  const { width, height } = Dimensions.get('window');
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<NavigationProp<any, 'Sign In'>>();
  const canMomentum = useRef(false);
  const pageCount = 5;

  /*
    Note: The loop can be broken. Start on page 1, scroll a little in either direction, then attempt to scroll
    to the page in the opposite direction. You will be unable to. This also works in reverse.
    This is due to an issue in the loop detection system. If the user touches the screen, onTouchStart is called.
    This records the initial position of the touch. If they move at all, onTouchMove is called,
    and if they have moved to the right at all, they are warped to the dummy page.
    However, once they start to scroll, the touch event is cancelled (not ended), and onTouchMove no longer triggers.
    If it did, this wouldn't be a problem. I can think of 2 solutions. 1) either get onTouchMove to keep working
    or find a substitute, or 2) i honestly forgot the other one rip but maybe I'll think of it

    Also I'm not entirely sure if I should always reset to page 1, or leave them on the dummy page
    and do the same detection thing for moving left

    I think that the scroll events are 'eating' the touch events, based on what I found so far
    It might be a focus issue though
    All we really need is to be able to detect if the user attempts to continue scrolling while at either edge
    Unfortunately, the scroll event doesn't detect that.

    Hmm. So the event is of type NativeSyntheticEvent<NativeTouchEvent>. I found two implementations,
    one in CoreEventTypes called GestureResponderEvent, and one in ScrollView called ScrollResponderEvent.
    Actually, the event is in fact of type GestureResponderEvent. I wonder if I can somehow try out the
    other one, since it is probably designed to work with scroll events.
    Also I noticed the property keyboardDismissMode in ScrollView, maybe that could be useful?
    idk if that counts for touch though
    I'm going to keep working on this.

    I have confirmed it: the scroll takes control of the responder and overrides the touch. I can change around
    what controls the responder, so my idea is to have two things that both want responder control: the
    ScrollView and something else. Every time any touch event happens, the other thing should take control,
    identify the position, and then surrender control. This means I need to figure out a priority system,
    where the second thing has a higher priority but isn't always active.

    Ooh so I might have the answer. The function onResponderMove fires when the user moves their finger
    and the view is responding, and it gives a GestureResponderEvent. This might be the answer. I can't test
    it right now since I don't have internet since it's late at night and my internet turns off at 9:30
    but I will test it tomorrow morning.
    It's 12:48 am. I need to go sleep.

    Grr it doesn't work, and I need to submit this so I can't keep testing now
    Someday I will figure this out
    */

  var initialTouchPos = 0;
  var currentTouchPos = 0;

  function onTouchStart(e: GestureResponderEvent) {
    initialTouchPos = e.nativeEvent.pageX;
  }

  function onTouchMove(e: GestureResponderEvent) {
    currentTouchPos = e.nativeEvent.pageX;
    if (pageIndex == 0 && currentTouchPos > initialTouchPos) {
      scrollViewRef.current?.scrollTo({ x: width * pageCount, animated: false });
    }
    if (pageIndex == pageCount && currentTouchPos < initialTouchPos) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false });
    }
  }

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const indexOfNextScreen = Math.round(e.nativeEvent.contentOffset.x / width);
    if (indexOfNextScreen !== sliderState.currentPage) {
      setSliderState({ ...sliderState, currentPage: indexOfNextScreen });
    }
  }

  // This is because the onMomentumScrollEnd triggers multiple times, and this limits
  // it to one per scroll
  function onMomentumScrollBegin() {
    canMomentum.current = true;
  }

  // Is this even needed? It only activates if the scroll stops on the dummy page,
  // but since there is loop detection for both page 1 and the dummy, it might
  // be fine to allow the user to be on either
  // I know it's slightly better to only use one, but I'm not sure if that's more
  // important than the end update call
  // If this isn't needed, all the momentum stuff can be deleted
  function onMomentumScrollEnd() {
    if (canMomentum.current && sliderState.currentPage == pageCount) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false });
      setSliderState({ ...sliderState, currentPage: 0 });
    }
    canMomentum.current = false;
  }

  function Page1() {
    return (
      <View style={{ width, height }}>
        <Image style={styles.imageStyle} source={{ uri: 'https://www.cleanlink.com/resources/editorial/2021/cleaning-staff-26492.jpg' }} />
        <View style={styles.wrapper}>
          <Text style={styles.header}>Welcome to CleanBNB!</Text>
          <Text style={styles.paragraph}>Connecting Airbnb Owners with Top-Notch Cleaning Professionals, contractors and independent workers.</Text>
        </View>
      </View>
    );
  }

  function Page2() {
    return (
      <View style={{ width, height }}>
        <Image style={styles.imageStyle} source={{ uri: 'https://thumbs.dreamstime.com/b/magnifying-glass-over-map-showing-london-4908161.jpg' }} />
        <View style={styles.wrapper}>
          <Text style={styles.header}>Customizable Cleaning Services</Text>
          <Text style={styles.paragraph}>Choose the perfect cleaner for your property based on their skills and experience.</Text>
        </View>
      </View>
    );
  }

  function Page3() {
    return (
      <View style={{ width, height }}>
        <Image style={styles.imageStyle} source={{ uri: 'https://www.printablee.com/postpic/2012/09/housekeeping-cleaning-checklist_45980.jpg' }} />
        <View style={styles.wrapper}>
          <Text style={styles.header}>Streamlined Scheduling</Text>
          <Text style={styles.paragraph}>Effortlessly manage appointments with a built-in calendar and smart notifications.</Text>
        </View>
      </View>
    );
  }

  function Page4() {
    return (
      <View style={{ width, height }}>
        <Image style={styles.imageStyle} source={{ uri: 'data:image/png;base64,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' }} />
        <View style={styles.wrapper}>
          <Text style={styles.header}>Seamless Communication</Text>
          <Text style={styles.paragraph}>Stay in touch with your cleaners via our secure messaging platform.</Text>
        </View>
      </View>
    );
  }

  function Page5() {
    return (
      <View style={{ width, height }}>
        <View style={styles.wrapper}>
          <Image source={{
            // Page #5
            uri: 'https://assets.materialup.com/uploads/c3056633-7f11-4053-aee8-01a04be6e67f/preview.png'
          }} style={styles.imageStyle} />
          <Text style={styles.header}>Get Started Today!</Text>
          <Text style={styles.paragraph}>Sign up now and elevate your Airbnb property management experience.</Text>
        </View>
      </View>
    );
  }

  // const pages = [Page1, Page2, Page3, Page4, Page5, Page1];

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
          ref={scrollViewRef}
          // canCancelContentTouches={false}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          // onResponderStart={onTouchStart}
          // onMoveShouldSetResponder={() => { return true }}
          // onStartShouldSetResponder={() => { return true }}
          // onResponderMove={onTouchMove}
          onScroll={onScroll}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
        >
          {Page1()}
          {Page2()}
          {Page3()}
          {Page4()}
          {Page5()}
          {Page1()}
        </ScrollView>
        <View style={styles.paginationWrapper}>
          <View style={styles.button}>
            <Button title="Sign In" onPress={() => navigation.navigate('Sign In')} />
          </View>
        </View>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((_key, index) => (
            <View style={[styles.paginationDots, { opacity: (pageIndex % pageCount == index) ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%'
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
  paragraph: {
    fontSize: 20,
    justifyContent: 'center'
  },
  button: {
    // TODO: Make this look better
    padding: 50
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10
  }
});

export default Intro;