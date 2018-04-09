// @flow

import React from "react";
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {Dropdown} from "react-native-material-dropdown";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {TextField} from "react-native-material-textfield";
import Tabbar from "./Tabbar";
import MyText from "./MyText";
import {saveProfile, persist} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";
import messages from "../fa";

type Props = {
  dispatch: Dispatch,
  name: ?string,
  age: ?number
};
class Profile extends React.Component<Props> {
  componentDidMount() {
    setTimeout(() => {
      // this.props.history.push('/game/feedback')
    }, 1000 * 3);
  }
  handleChange = values => {
    const {name, age} = this.props;
    this.props.dispatch(saveProfile({name, age, ...values}));
    this.props.dispatch(persist("profile"));
  };
  render() {
    let data = ["14", "15", "16", "17", "18"].map(age => ({value: age}));

    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <FontAwesome style={styles.icon}>{Icons.user}</FontAwesome>
          </View>
          <TextField
            label={messages["profile.name"]}
            value={this.props.name}
            containerStyle={styles.input}
            titleTextStyle={styles.text}
            labelTextStyle={styles.text}
            affixTextStyle={styles.text}
            onChangeText={value => this.handleChange({name: value})}
          />
          <View style={styles.ageContainer}>
            <Dropdown
              value={this.props.age}
              label={messages["profile.age"]}
              data={data}
              onChangeText={value => this.handleChange({age: value})}
            />
          </View>
        </View>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    paddingLeft: 25,
    alignItems: "flex-start",
    flex: 1
  },
  iconContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: 'green',
    // borderRadius: 100/2,
    height: 100,
    width: 100,
    marginTop: 30
  },
  icon: {
    fontSize: 68,
    color: "green"
    // paddingTop: 25,
  },
  input: {
    height: 80,
    width: "90%"
  },
  ageContainer: {
    width: 102,
    height: 82
    // fontWeight: 'bold',
  },
  picker: {
    width: 100,
    height: 50,
    flexDirection: "row",
    borderWidth: 1
  },
  text: {
    fontFamily: "IRANYekanRDMobile"
  }
});
export default connect((state: RootState) => state.profile)(Profile);
