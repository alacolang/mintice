// @flow
import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";

// const icons = [Icons.heartO, Icons.circleO, Icons.heartO, Icons.heartO];
const icons = ["T", "X", "N", "O"];
const iconColors = ["red", "green", "red", "green"];
const RandomImage = () => (
  <Image
    source={{
      uri: `https://picsum.photos/200/300?i=${new Date().toDateString()}`
    }}
    style={styles.image}
  />
);

class GameTrial extends React.Component {
  render() {
    const iconIdx = Math.floor(Math.random() * 4);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={[styles.imageIcon, {color: iconColors[iconIdx]}]}>
            {icons[iconIdx]}
          </Text>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.buttonContainer}>
          <FontAwesome style={styles.buttonIcon}>{Icons.thumbsUp}</FontAwesome>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040"
  },
  imageContainer: {
    marginBottom: 25,
    width: 220,
    height: 320,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10
  },
  imageIcon: {
    fontSize: 48 * 4,
    color: "white"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 3,
    borderColor: "grey"
  },
  buttonIcon: {
    color: "grey",
    fontSize: 42
  }
});
export default GameTrial;
