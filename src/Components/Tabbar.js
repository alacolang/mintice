// @flow

import React from "react";
import {View, Image, Text, StyleSheet} from "react-native";
import {withRouter} from "react-router";
import {Link} from "react-router-native";
import FontAwesome, {Icons} from "react-native-fontawesome";
import user from "../images/user.png";
import report from "../images/report.png";
import play from "../images/play.png";
import wallet from "../images/wallet.png";
import routes from "../logic/routes";

type TabProps = {
  to: string,
  icon?: string,
  image?: any,
  path: string
};
const Tab = ({to, icon, image, path}: TabProps) => (
  <Link style={styles.tabContainer} to={to}>
    {image ? (
      <Image style={styles.image} source={image} />
    ) : (
      <FontAwesome
        style={[styles.icon, {color: path.includes(to) ? "green" : "grey"}]}
      >
        {icon}
      </FontAwesome>
    )}
  </Link>
);

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
        <Tab to={routes.report} image={wallet} path={path} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tabContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 44,
    height: 44,
    fontSize: 42
    // borderWidth: 1,
  },
  image: {
    width: 30,
    height: 30
  }
});

export default withRouter(Tabbar);
