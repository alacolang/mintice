// @flow

import React from "react";
import type {History} from "history";
import {FormattedMessage} from "react-intl";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import type {Dispatch} from "redux";
import {Dropdown} from "react-native-material-dropdown";
import FontAwesome, {Icons} from "react-native-fontawesome";
import {TextField} from "react-native-material-textfield";
import Tabbar from "./Tabbar";
import MyText from "./MyText";
import routes from "../logic/routes";
import {saveProfile, persist, reset} from "../logic/actions";
import type {State as RootState} from "../logic/reducers";
import messages from "../fa";

type Props = {
  dispatch: Dispatch,
  name: ?string,
  age: ?number,
  history: History
};
class Profile extends React.Component<Props> {
  handleReset = () => {
    this.props.dispatch(reset());
  };
  handleAbout = () => {
    this.props.history.push(routes.about);
  };
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
            tintColor="#4F938C"
            textColor="grey"
            titleTextStyle={[styles.text, styles.textTitle]}
            labelTextStyle={[styles.text, styles.textLabel]}
            affixTextStyle={[styles.text, styles.textAffix]}
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
        <TouchableOpacity
          onPress={this.handleReset}
          style={styles.resetContainer}
        >
          <MyText style={styles.reset}>
            <FormattedMessage id="reset" />
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleAbout}
          style={styles.aboutContainer}
        >
          <MyText style={styles.about}>
            <FontAwesome>{Icons.infoCircle}</FontAwesome>
          </MyText>
        </TouchableOpacity>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#EFF9D8"
  },
  container: {
    paddingHorizontal: 25,
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
    color: "#6FA8A2"
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
  textTitle: {
    color: "#4F938C"
  },
  textLabel: {
    color: "#4F938C"
  },
  textAffix: {
    color: "#4F938C"
  },
  text: {
    fontFamily: "IRANYekanRDMobile"
  },
  resetContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-end",
    marginBottom: 40,
    marginRight: 25
  },
  reset: {
    color: "white"
  },
  aboutContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginBottom: 40,
    marginRight: 25
  },
  about: {
    color: "#4F938C",
    fontSize: 28
  }
});
export default connect((state: RootState) => state.profile)(Profile);
