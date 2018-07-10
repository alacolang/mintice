// @flow
import React from "react";
import {StyleSheet, View} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import type {IGame, Item} from "../logic/games";

const ItemRenderer = ({item}: {item: Item}) => <item.Component />;

const Goal = ({game}: {game: IGame}) => {
  console.log("game=", game);
  return (
    <View style={styles.container}>
      <MyText style={styles.items}>
        <FormattedMessage
          id="block.binary.go"
          values={{
            like: <FontAwesome>{Icons.thumbsUp}</FontAwesome>
          }}
        />
      </MyText>
      {game.goItems().map(item => <ItemRenderer key={item.id} item={item} />)}
      <MyText style={styles.items}>
        <FormattedMessage id="block.binary.nogo" />
      </MyText>
      {game.nogoItems().map(item => <ItemRenderer key={item.id} item={item} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  items: {
    color: "grey",
    marginVertical: 15,
    fontSize: 18
  }
});

export default Goal;
