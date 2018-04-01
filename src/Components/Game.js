import React from 'react'
import { View } from 'react-native'
import { Route } from 'react-router-native'
import GameTrial from './GameTrial'
import GameSession from './GameSession'
import GameFeedback from './GameFeedback'
import GameBlank from './GameBlank'
import GameIntro from './GameIntro'
import GameFixation from './GameFixation'

class Game extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Route path='/game/intro' component={GameIntro} />
        <Route path='/game/trial' component={GameTrial} />
        <Route path='/game/feedback' component={GameFeedback} />
        <Route path='/game/blank' component={GameBlank} />
        <Route path='/game/fixation' component={GameFixation} />
        <Route path='/game' exact component={GameSession} />
      </View>
    )
  }
}

export default Game