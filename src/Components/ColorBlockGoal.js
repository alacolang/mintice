// @flow
import React from "react";
import {StyleSheet, View} from "react-native";
import {take} from "ramda";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import type {IGame, Item} from "../logic/games";

const ItemRenderer = ({item}: {item: Item}) => (
  <View style={styles.goalItem}>
    <item.Component textStyle={styles.goalItemText} />
  </View>
);

type GameProps = {
  game: IGame
};

const Goal = ({game}: GameProps) => (
  <View style={styles.container}>
    <MyText style={styles.goalDescription}>
      <FormattedMessage id="block.colors.go" />
    </MyText>
    <View style={styles.goalItemsContainer}>
      {take(4, game.goItems()).map(item => (
        <ItemRenderer key={item.id} item={item} />
      ))}
    </View>
    <MyText style={styles.goalDescription}>
      <FormattedMessage
        id="block.colors.nogo"
        values={{color: game.data.pickedColor}}
      />
    </MyText>
    <View style={styles.goalItemsContainer}>
      {take(3, game.nogoItems()).map(item => (
        <ItemRenderer key={item.id} item={item} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  goalDescription: {
    marginTop: 35,
    marginBottom: 10,
    marginHorizontal: 25,
    fontSize: 18,
    color: "#A0C251"
  },
  goalItemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  goalItem: {
    backgroundColor: "#fff",
    // backgroundColor: "#B2B9AD",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 2
  },
  goalItemText: {
    fontSize: 18,
    marginHorizontal: 5
  }
});

export default Goal;
