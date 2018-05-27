// @flow

import React from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";
import {withRouter} from "react-router";
import {Link} from "react-router-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import user from "../images/user.png";
import report from "../images/report.png";
import play from "../images/play.png";
import wallet from "../images/wallet.png";
import walletInactive from "../images/wallet-inactive.png";
import routes from "../logic/routes";

type TabProps = {
  to: string,
  icon?: string,
  image?: any,
  path: string
};

const Tab = ({to, icon, image, path}: TabProps) => {
  const contents = image ? (
    <Image
      style={styles.image}
      source={image[path.includes(to) ? "active" : "inactive"]}
    />
  ) : (
    <FontAwesome
      style={[styles.icon, {color: path.includes(to) ? "#195C85" : "#9CB9CB"}]}
    >
      {icon}
    </FontAwesome>
  );

  return path.includes(to) ? (
    <View style={styles.tabContainer}>{contents}</View>
  ) : (
    <Link component={TouchableOpacity} style={styles.tabContainer} to={to}>
      {contents}
    </Link>
  );
};

type Props = {
  match: {path: string}
};
class Tabbar extends React.Component<Props> {
  render() {
    const {path} = this.props.match;
    return (
      <View style={styles.container}>
        <Tab to={routes.profile} icon={Icons.user} path={path} />
        <Tab to={routes.game} icon={Icons.playCircle} path={path} />
        <Tab
          to={routes.report}
          image={{active: wallet, inactive: walletInactive}}
          path={path}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D9F19F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#CFD0C3"
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 30,
    height: 30,
    fontSize: 32
    // borderWidth: 1,
  },
  image: {
    width: 27,
    height: 27
  }
});

export default withRouter(Tabbar);
