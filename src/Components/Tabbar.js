import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Link } from 'react-router-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import user from '../images/user.png'
import report from '../images/report.png'
import play from '../images/play.png'
import routes from '../logic/routes'

const Tab = ({ to, icon }) => (
  <Link style={styles.tabContainer} to={to}>
    <FontAwesome style={[styles.icon, {color: to=='/profile' ? 'green' : 'grey'} ]}>{icon}</FontAwesome>
  </Link>
)

class Tabbar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Tab to={routes.profile} icon={Icons.user} />
        <Tab to={routes.game} icon={Icons.playCircle} />
        <Tab to={routes.report} icon={Icons.barChart} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    fontSize: 42,
    // borderWidth: 1,
  }
})

export default Tabbar