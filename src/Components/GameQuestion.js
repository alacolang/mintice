// @flow
import React from "react";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import games from "../logic/games";
import type {Item, IGame} from "../logic/games";
import {trialResult, setTrialCategory} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";

type Props = {
  dispatch: Dispatch,
  game: IGame
};
type State = {
  item: ?Item,
  isGo: ?boolean,
  start: Date
};

class GameQuestion extends React.Component<Props, State> {
  state = {item: null, isGo: null, start: new Date()};
  componentDidMount() {
    const [category, item] = this.props.game.pickItem();
    this.props.dispatch(setTrialCategory(category));
    this.setState({item, isGo: category == "go"});
  }
  handlePress = () => {
    this.props.dispatch(trialResult(new Date() - this.state.start));
  };
  render() {
    if (!this.state.item) return null;
    const iconIdx = Math.floor(Math.random() * 4);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>{this.state.item.render()}</View>
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.buttonContainer}
        >
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

const mapStateToProps = (state: RootState) => ({
  game: games.find(game => game.id == state.game.metrics.gameID)
});
export default connect(mapStateToProps)(GameQuestion);
