import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Animated, Dimensions, ScrollView, Modal, TextInput } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { InputOutline, InputStandard } from 'react-native-input-outline';
import CONFIG from '../../config';


export default function CardsScreen() {

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentCardText, setCurrentCardText] = React.useState("");
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const [cards, setCards] = React.useState(['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']);
  var isFlippedRef = useRef(false)
  const inputRef = useRef(null);
  const [swiperKey, setSwiperKey] = React.useState(false);

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

  const openModal = () => {
    console.log("Inside the openmodal")
    console.log("currentCardIndex", currentCardIndex)
    setCurrentCardText(cards[currentCardIndex])
    setModalVisible(true)
  }

  useEffect(() => {
    fetch(`http://${CONFIG.API_URL}:3000/api/v1/words`) // How do I make this HTTPS?
      .then(res => res.json())
      .then(data => {
        console.log("data")
        console.log(data)
        setCards(data.words)
      }
      )
      .catch(err => console.log(err))
    console.log("use effect called")
    console.log(cards)
  }, [])


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
      <Swiper
        cards={cards}
        key = {swiperKey} // needed to trigger rerender of cards
        renderCard={(card) => {
          return (
            <View>
              <View style={styles.container}>
                <Animated.View style={[styles.cardFront, styles.card, flipToFront]}>
                  <Text style={styles.text}>front</Text>
                  <Text style={styles.text}>{card}</Text>
                  <Button style={{ marginTop: 2 }} title='Open Modal' onPress={openModal}></Button>

                </Animated.View>
                <Animated.View style={[styles.cardBack, styles.card, flipToBack]}>
                  <Text style={styles.text}>back</Text>
                  <Text style={styles.text}>{card}</Text>
                  <Button title='Open Modal' onPress={openModal}></Button>

                </Animated.View>
              </View>
            </View>
          )
        }}
        showSecondCard={true}
        onSwiped={(cardIndex) => {
          console.log(cardIndex)
          setCurrentCardIndex(cardIndex + 1)
        }}
        overlayLabels={myOverlayLabels}
        // overlayLabelStyle={styles.myOverlayStyle}
        onTapCard={(cardIndex) => {
          flipCard()
        }}
        onSwipedAll={() => { console.log('onSwipedAll') }}
        cardIndex={0}
        infinite={true}
        backgroundColor={styles.offWhiteBackground.backgroundColor}
        stackSize={3}
        stackSeparation={5}>
      </Swiper>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)  // closes modal when back button is pressed
        }}
      >
        <View style={[styles.modalView, styles.offWhiteBackground]}>
          <View style={{ padding: 20 }}>
            {/* <TextInput ref={inputRef} placeholder={currentCard} /> */}
            {/* <TextInput ref={inputRef} placeholder="Type here" /> */}
            <TextInput
              style={styles.input}
              onChangeText={setCurrentCardText}
              value={currentCardText}
            />
          </View>
          <Text>Here I am :)</Text>
          <Button
            title="Hide modal"
            onPress={() => {
              setModalVisible(!modalVisible)
              cards[currentCardIndex] = currentCardText
              // update array s.t. current card is in the front. 
              // it needs to be done this way because on the rereder below, the first card is the one to appear
              // This way, the user doesn't lose their place every time.
              var ending = cards.splice(0, currentCardIndex)
              var combined = cards.concat(ending)
              setCards(combined)
              setSwiperKey(!swiperKey) // Triggers card text to rerender
            }} />
        </View>
      </Modal>
    </View >
  );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    // justifyContent: 'center',
    alignItems: 'center'
  },


  card: {
    borderRadius: 10,
    fontSize: 50,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: 'hidden',
    position: "absolute",
    width: width - 20,
    height: height * .8,
  },
  cardBack: {
    backgroundColor: "#4e44c0"
  },
  cardFront: {
    backgroundColor: "#7140ce"
  },
  offWhiteBackground: {
    backgroundColor: "#f0f0f0"
  },
  modalView: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
    color: "white",
  },
  swiperCard: {
    backgroundColor: "lime-400"
  }
});


const myOverlayLabels = {
  bottom: {
    title: 'BLEAH',
    style: {
      label: {
        backgroundColor: 'white',
        borderColor: 'black',
        color: 'grey',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  left: {
    title: 'NOPE',
    style: {
      label: {
        backgroundColor: 'white',
        borderColor: 'black',
        color: 'red',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: -30
      }
    }
  },
  right: {
    title: 'LIKE',
    style: {
      label: {
        backgroundColor: 'white',
        borderColor: 'black',
        color: 'green',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30
      }
    }
  },
  top: {
    title: 'SUPER LIKE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
}