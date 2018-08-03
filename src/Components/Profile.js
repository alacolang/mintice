// @flow

import React from "react";
import type { History } from "history";
import { FormattedMessage } from "react-intl";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import type { Dispatch } from "redux";
import { Dropdown } from "react-native-material-dropdown";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { TextField } from "react-native-material-textfield";
import Tabbar from "./Tabbar";
import MyText from "./MyText";
import routes from "../logic/routes";
import { saveProfile, persist, reset } from "../logic/actions";
import type { State as RootState } from "../logic/reducers";
import messages from "../utils/fa";

type Props = {
  dispatch: Dispatch,
  name: ?string,
  age: ?number,
  history: History,
};
type State = {
  name: ?string,
  age: ?number,
};

const Reset = ({ handleReset }) => (
  <TouchableOpacity onPress={handleReset} style={resetStyles.resetContainer}>
    <MyText style={resetStyles.reset}>
      <FormattedMessage id="reset" />
    </MyText>
  </TouchableOpacity>
);
const resetStyles = StyleSheet.create({
  resetContainer: {
    width: 200,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginTop: 20,
  },
  reset: {
    color: "grey",
  },
});

class Profile extends React.Component<Props, State> {
  state: State = { name: this.props.name, age: this.props.age };
  handleReset = () => {
    this.props.dispatch(reset());
    this.props.dispatch(persist("game"));
  };
  handleAbout = () => {
    this.props.history.push(routes.about);
  };
  handleChange = values => {
    const { name, age } = this.state;
    this.setState(currentState => ({ name, age, ...values }));
  };
  handleSave = () => {
    this.props.dispatch(saveProfile(this.state));
    this.props.dispatch(persist("profile"));
  };
  render() {
    let data = ["14", "15", "16", "17", "18"].map(age => ({ value: age }));

    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.handleAbout} style={styles.about}>
            <MyText style={styles.aboutLabel}>
              <FontAwesome>{Icons.infoCircle}</FontAwesome>
            </MyText>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <FontAwesome style={styles.icon}>{Icons.user}</FontAwesome>
          </View>
          <TextField
            label={messages["profile.name"]}
            value={this.state.name}
            containerStyle={styles.input}
            tintColor="#4F938C"
            textColor="grey"
            titleTextStyle={[styles.text, styles.textTitle]}
            labelTextStyle={[styles.text, styles.textLabel]}
            onChangeText={value => this.handleChange({ name: value })}
          />
          <View style={styles.ageContainer}>
            <Dropdown
              value={this.state.age}
              label={messages["profile.age"]}
              data={data}
              onChangeText={value => this.handleChange({ age: value })}
            />
          </View>
          <TouchableOpacity onPress={this.handleSave} style={styles.save}>
            <MyText style={styles.saveLabel}>
              <FormattedMessage id="profile.save" />
            </MyText>
          </TouchableOpacity>
          {process.env.NODE_ENV == "development" && (
            <Reset handleReset={this.handleReset} />
          )}
        </View>
        <Tabbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  container: {
    paddingHorizontal: 25,
    alignItems: "flex-start",
    flex: 1,
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
    marginTop: 30,
  },
  icon: {
    fontSize: 68,
    color: "#195C85",
    // paddingTop: 25,
  },
  input: {
    height: 80,
    width: "90%",
  },
  ageContainer: {
    width: 102,
    height: 82,
    // fontWeight: 'bold',
  },
  picker: {
    width: 100,
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
  },
  textTitle: {
    color: "#4F938C",
  },
  textLabel: {
    color: "#4F938C",
  },
  textAffix: {
    color: "#4F938C",
  },
  text: {
    fontFamily: "IRANYekanRDMobile",
  },
  save: {
    height: 45,
    width: 200,
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#4F938C",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginTop: 50,
  },
  saveLabel: {
    color: "#4F938C",
    fontSize: 16,
  },
  about: {
    position: "absolute",
    top: 20,
    right: 0,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  aboutLabel: {
    color: "grey",
    fontSize: 28,
  },
});
export default connect((state: RootState) => state.profile)(Profile);
