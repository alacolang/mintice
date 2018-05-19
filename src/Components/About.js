// @flow
import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import {FormattedMessage} from "react-intl";
import FontAwesome, {Icons} from "react-native-fontawesome";
import MyText from "./MyText";
import logo from "../images/logo.png";
import wallet from "../images/wallet.png";

const Navbar = ({handleBack}) => (
  <View style={navbarStyles.navbar}>
    <View style={navbarStyles.body}>
      <TouchableOpacity onPress={handleBack} style={navbarStyles.back}>
        <MyText style={navbarStyles.icon}>
          <FontAwesome>{Icons.arrowRight}</FontAwesome>
        </MyText>
      </TouchableOpacity>
      <MyText style={navbarStyles.title}>
        <FormattedMessage id="about.title" />
      </MyText>
    </View>
  </View>
);

const Footer = () => (
  <View style={footerStyles.container}>
    <Image style={footerStyles.logo} source={logo} />
    <View style={footerStyles.body}>
      <MyText style={footerStyles.title}>
        <FormattedMessage id="app.title" />
      </MyText>
      <MyText style={footerStyles.program}>
        <FormattedMessage id="about.program" />
      </MyText>
    </View>
  </View>
);

class About extends React.Component<Props> {
  handleBack = () => {
    this.props.history.back();
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar handleBack={this.handleBack} />
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.note}>
            <MyText style={styles.text}>
              <FormattedMessage id="about.goal" />
            </MyText>
          </View>
          <View style={styles.note}>
            <View style={styles.iconContainer}>
              <MyText style={styles.icon}>
                <FontAwesome>{Icons.playCircle}</FontAwesome>
              </MyText>
            </View>
            <View style={styles.noteBody}>
              <MyText style={styles.text}>
                <FormattedMessage id="about.description" />
              </MyText>
            </View>
          </View>
          <View style={styles.note}>
            <View style={styles.iconContainer}>
              <Image source={wallet} style={styles.image} />
            </View>
            <View style={styles.noteBody}>
              <MyText style={styles.text}>
                <FormattedMessage id="about.gamification" />
              </MyText>
            </View>
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
  }
}

const navbarStyles = StyleSheet.create({
  navbar: {
    paddingVertical: 11,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "lightgrey"
  },
  body: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 25
  },
  title: {
    marginLeft: 25,
    fontSize: 18
  },
  back: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 18,
    color: "#4F938C"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start"
    // borderWidth: 2
  },
  body: {
    paddingHorizontal: 15,
    // paddingTop: 25,
    // alignItems: "center",
    justifyContent: "flex-start"
    // borderWidth: 4,
    // borderColor: "red"
  },
  note: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10
    // width: "95%",
    // borderWidth: 1
  },
  iconContainer: {
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 25,
    color: "green"
  },
  image: {
    width: 20,
    height: 20
  },
  noteBody: {
    flexDirection: "column",
    flex: 1,
    position: "relative",
    top: -8
    // borderWidth: 5
  },
  text: {
    fontSize: 16,
    lineHeight: 2 * 16,
    color: "grey"
  }
});

const footerStyles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "#f8f8f8"
  },
  logo: {
    width: 50,
    height: 50
  },
  title: {
    fontSize: 18,
    color: "#4F938C",
    marginLeft: 15,
    position: "relative",
    top: -8
  },
  program: {
    fontSize: 16,
    color: "grey",
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 2 * 16
    // position: "relative",
  }
  // researcher: {
  //   fontSize: 18,
  //   color: "#4F938C",
  //   marginLeft: 15,
  //   // position: "relative",
  //   // top: -8
  // }
});

export default About;