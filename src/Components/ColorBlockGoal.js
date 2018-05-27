// @flow
import React from "react";
import {StyleSheet, View} from "react-native";
import {take, takeLast} from "ramda";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import type {IGame, Item} from "../logic/games";

const ItemRenderer = ({item}: {item: Item}) => (
  <View style={styles.item}>
    <item.Component textStyle={styles.itemText} />
  </View>
);

type GameProps = {
  game: IGame
};

const Goal = ({game}: GameProps) => (
  <View style={styles.container}>
    <MyText style={styles.description}>
      <FormattedMessage id="block.colors.go" />
    </MyText>
    <View style={styles.itemsContainer}>
      <View style={styles.itemsRow}>
        {take(3, game.goItems()).map(item => (
          <ItemRenderer key={item.id} item={item} />
        ))}
      </View>
      <View style={styles.itemsRow}>
        {takeLast(3, game.goItems()).map(item => (
          <ItemRenderer key={item.id} item={item} />
        ))}
      </View>
    </View>
    <MyText style={styles.description}>
      <FormattedMessage
        id="block.colors.nogo"
        values={{color: game.data.pickedColor}}
      />
    </MyText>
    <View style={styles.itemsContainer}>
      <View style={styles.itemsRow}>
        {take(3, game.nogoItems()).map(item => (
          <ItemRenderer key={item.id} item={item} />
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  description: {
    marginTop: 35,
    marginBottom: 20,
    marginHorizontal: 25,
    fontSize: 18,
    color: "grey",
    lineHeight: 18 * 1.5
  },
  itemsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a0a0a0",
    // borderRadius: 10,
    paddingVertical: 10
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 80,
    alignItems: "center"
  },
  itemText: {
    // textAlign: "center",
    fontSize: 16
  }
});

export default Goal;
