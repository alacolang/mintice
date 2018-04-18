// @flow
import React from "react";
import {StyleSheet, View} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {FormattedMessage} from "react-intl";
import MyText from "./MyText";
import type {IGame, Item} from "../logic/games";

const ItemRenderer = ({item}: {item: Item}) => <item.Component />;

const BinaryBlockGoal = ({game}: {game: IGame}) => {
  console.log("game=", game);
  return (
    <View>
      <MyText style={styles.items}>
        <FormattedMessage id="block.binary.pick" />
      </MyText>
      {game.goItems().map(item => <ItemRenderer key={item.id} item={item} />)}
      <MyText style={styles.items}>
        <FormattedMessage id="block.binary.skip" />
      </MyText>
      {game.nogoItems().map(item => <ItemRenderer key={item.id} item={item} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    marginVertical: 15
  }
});

export default BinaryBlockGoal;
