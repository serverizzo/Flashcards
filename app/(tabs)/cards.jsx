import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Animated, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';

export default function CardsScreen() {

  const [isFlipped, setIsFlipped] = React.useState(false);
  var isFlippedRef = useRef(false)

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
    if (isFlippedRef.current) {
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
    // setIsFlipped(!isFlipped);
    isFlippedRef.current = !isFlippedRef.current
  };

  return (
    <View style={styles.container}>

      <Button
        onPress={() => { console.log('oulala') }}
        title="Press me">
        You can press me
      </Button>

      {/* <View style={styles.container}>
        <Pressable style={[styles.cardContainer]} onPress={() => { flipCard(); }}>
          <Animated.View style={[styles.cardFront, styles.card, flipToFront]}>
            <Text style={styles.text}>front</Text>
          </Animated.View>
          <Animated.View style={[styles.cardBack, styles.card, flipToBack]}>
            <Text style={styles.text}>back</Text>
          </Animated.View>
        </Pressable>
      </View> */}

      <Swiper
        cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
        renderCard={(card) => {
          return (
            <View>
              <View style={styles.container}>
              <Animated.View style={[styles.cardFront, styles.card, flipToFront]}>
                  <Text style={styles.text}>front</Text>
                  <Text style={styles.text}>{card}</Text>
                  </Animated.View>
                  <Animated.View style={[styles.cardBack, styles.card, flipToBack]}>
                    <Text style={styles.text}>back</Text>
                  </Animated.View>
              </View>
            </View>
          )
        }}
        showSecondCard={false}
        onSwiped={(cardIndex) => {
          // setIsFlipped(!isFlipped)
          isFlippedRef.current = !isFlippedRef.current

          console.log(cardIndex)
        }}
        onTapCard={(cardIndex) => { flipCard() }}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        infinite={true}
        backgroundColor={'#616622'}
        stackSize={3}
        stackSeparation={5}>
      </Swiper>


      {/* <View style={styles.container}>
        <Pressable style={styles.cardContainer} onPress={flipCard}>
          <Animated.View style={[styles.cardFront, styles.card, flipToFront]}>
            <Text style={styles.text}>front</Text>
          </Animated.View>
          <Animated.View style={[styles.cardBack, styles.card, flipToBack]}>
            <Text style={styles.text}>back</Text>
          </Animated.View>
        </Pressable>
      </View> */}



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
  cardContainer: {
    height: height - 10,
    width: width - 20,
  },
  card: {
    borderRadius: 10,
    fontSize: 50,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: 'hidden',
    position: "absolute",
    width: width - 20,
    height: height / 3,
  },
  cardBack: {
    backgroundColor: "#4e44c0"
  },
  cardFront: {
    backgroundColor: "#7140ce"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
    color: "white"
  },
  swiperCard: {
    backgroundColor: "lime-400"
  }
});
