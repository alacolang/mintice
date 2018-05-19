// @flow
import React from "react";
import {View, Image, StyleSheet} from "react-native";
import {take} from "ramda";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {FormattedMessage} from "react-intl";
import Game from "./Game";
import type {Item, IGame} from "./Game";
import MyText from "../../Components/MyText";
import {CATEGORY} from "./index";
import type {Category} from "./index";

const G1 = "hands_go_1";
const G2 = "hands_go_2";
const G3 = "hands_go_3";
const G4 = "hands_go_4";
const G5 = "hands_go_5";
const G6 = "hands_go_6";
const G7 = "hands_go_7";
const G8 = "hands_go_8";
const G9 = "hands_go_9";
const G10 = "hands_go_10";
const NG1 = "hands_nogo_1";
const NG2 = "hands_nogo_2";
const NG3 = "hands_nogo_3";
const NG4 = "hands_nogo_4";
const NG5 = "hands_nogo_5";
const NG6 = "hands_nogo_6";
const NG7 = "hands_nogo_7";
const NG8 = "hands_nogo_8";
const NG9 = "hands_nogo_9";
const NG10 = "hands_nogo_10";

const itemFactory = (images, startIdx = 0): Item[] =>
  images.map((image, idx) => ({
    id: idx + startIdx,
    Component: ({style}) => (
      <Image source={{uri: image}} style={[styles.image, style]} />
    )
  }));
const goItems = itemFactory([G1, G2, G3, G4, G5, G6, G7, G8, G9, G10]);
const ngItems = itemFactory(
  [NG1, NG2, NG3, NG4, NG5, NG6, NG7, NG8, NG9, NG10],
  goItems.length
);
const items = goItems.concat(ngItems);

const GoalItem = ({item}: {item: Item}) => (
  <item.Component style={styles.goalImage} />
);

const Goal = () => (
  <View style={styles.goalContainer}>
    <MyText style={styles.items}>
      <FormattedMessage id="block.hands.go" />
    </MyText>
    <View style={styles.goalItemsContainer}>
      {take(2, goItems).map(item => <GoalItem key={item.id} item={item} />)}
    </View>
    <MyText style={styles.items}>
      <FormattedMessage id="block.hands.nogo" />
    </MyText>
    <View style={styles.goalItemsContainer}>
      {take(2, ngItems).map(item => <GoalItem key={item.id} item={item} />)}
    </View>
  </View>
);

const Hands: IGame = {
  ...Game,
  id: "hands",
  blockToRun: 3,
  random: undefined,
  items,
  goItems() {
    return goItems;
  },
  nogoItems() {
    return ngItems;
  },
  Goal
};

const styles = StyleSheet.create({
  goalContainer: {
    alignItems: "center"
  },
  goalItemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  goalImage: {
    width: 90,
    marginHorizontal: 5,
    height: 90,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5
  },
  items: {
    marginVertical: 15,
    fontSize: 18,
    color: "grey"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5
  }
});

export default Hands;
