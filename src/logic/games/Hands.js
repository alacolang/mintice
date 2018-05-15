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

import G1 from "../../images/hands/go/1.jpg";
import G2 from "../../images/hands/go/2.jpg";
import G3 from "../../images/hands/go/3.jpg";
import G4 from "../../images/hands/go/4.jpg";
import G5 from "../../images/hands/go/5.jpg";
import G6 from "../../images/hands/go/6.jpg";
import G7 from "../../images/hands/go/7.jpg";
import G8 from "../../images/hands/go/8.jpg";
import G9 from "../../images/hands/go/9.jpg";
import G10 from "../../images/hands/go/10.jpg";
import NG1 from "../../images/hands/nogo/1.jpg";
import NG2 from "../../images/hands/nogo/2.jpg";
import NG3 from "../../images/hands/nogo/3.jpg";
import NG4 from "../../images/hands/nogo/4.jpg";
import NG5 from "../../images/hands/nogo/5.jpg";
import NG6 from "../../images/hands/nogo/6.jpg";
import NG7 from "../../images/hands/nogo/7.jpg";
import NG8 from "../../images/hands/nogo/8.jpg";
import NG9 from "../../images/hands/nogo/9.jpg";
import NG10 from "../../images/hands/nogo/10.jpg";

const itemFactory = (images, startIdx = 0): Item[] =>
  images.map((image, idx) => ({
    id: idx + startIdx,
    Component: ({style}) => (
      <Image source={image} style={[styles.image, style]} />
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
    color: "#A0C251"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5
  }
});

export default Hands;
