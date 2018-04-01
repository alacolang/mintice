import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class GameSession extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Session</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default GameSession