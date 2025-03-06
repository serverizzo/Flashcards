import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Animated, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

export default function CardsScreen() {

  const [isFlipped, setIsFlipped] = React.useState(false);

  const flipAnimation = useRef(new Animated.Value(0)).current
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const flipToFront = {
    transform: [
      { rotateY: frontInterpolate }
    ]
  };
  const flipToBack = {
    transform: [
      { rotateY: backInterpolate }
    ]
  };

  const flipCard = () => {
    console.log("pressed flip card")
    if (isFlipped) {
      // animate back to the front side
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      // animate to the back side
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>
      {/* <Swiper
        cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        renderCard={(card) => {
          return (
            <View style={styles.card}>
              <Text style={styles.text}>{card}</Text>
            </View>
          )
        }}
        showSecondCard={false}
        onSwiped={(cardIndex) => { console.log(cardIndex) }}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        backgroundColor={'#4FD0E9'}
        stackSize={3}
        stackSeparation={5}>
      </Swiper> */}
      <Button
        onPress={() => { console.log('oulala') }}
        title="Press me">
        You can press me
      </Button>
      {/* <Animated.View onPress={flipCard} style={[styles.card, isFlipped ? flipToBack : flipToFront]}>
        <Pressable
          style={styles.cardFront}
          onPress={() => { console.log("you pressed the front!") }}  >
          <Text>front</Text>
        </Pressable>
      </Animated.View>       */}
      <View style={styles.container}>
        <Pressable style={styles.card} onPress={flipCard}>
          <Animated.View style={[styles.cardFront, flipToFront]}>
            <Text style={styles.text}>front</Text>
          </Animated.View>
          <Animated.View style={[styles.cardBack, flipToBack]}>
            <Text style={styles.text}>back</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View >
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    marginTop: 100,
  },
  card: {
    flex: .5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    backfaceVisibility: 'hidden',
    width: width - 20,
    height: height / 3,
    alignSelf: "center",
    position: "absolute"
  },
  cardBack: {
    backgroundColor: "#4e44c0",
    borderRadius: 10,
    fontSize: 50,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: 'hidden',
    position: "absolute",
    width: width - 20,
    height: height / 3,

  },
  cardFront: {
    backgroundColor: "#7140ce",
    borderRadius: 10,
    fontSize: 50,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: 'hidden',
    position: "absolute",
    width: width - 20,
    height: height / 3,


  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
    color: "white"
  }
});
