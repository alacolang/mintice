import React from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { TextField } from 'react-native-material-textfield'
import Tabbar from './Tabbar'
import MyText from './MyText'

class Profile extends React.Component {
  state = { age: undefined }
  componentDidMount() {
    setTimeout(()=> {
      // this.props.history.push('/game/feedback')
    }, 1000*3)
  }
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <FontAwesome style={styles.icon}>{Icons.user}</FontAwesome>
          </View>
          <TextField
            label='نام و نام خانوادگی'
            // value={'قلی'}
            containerStyle={styles.input}
            titleTextStyle={styles.text}
            labelTextStyle={styles.text}
            affixTextStyle={styles.text}
          />
          <View
            style={styles.ageContainer}
          >
            <MyText>سن</MyText>
            <Picker
              style={styles.picker}
              selectedValue={this.state.age}
              onValueChange={(itemValue, itemIndex) => this.setState({ age: itemValue })}
            >
              {
                ['14', '15', '16', '17', '18'].map(
                  age => (<Picker.Item key={age} label={age} value={age} />)
                )
              }
            </Picker>
          </View>
        </View>
        <Tabbar />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingLeft: 25,
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 3,
    // borderColor: 'green',
    // borderRadius: 100/2,
    height: 100,
    width: 100,
    marginTop: 30,
  },
  icon: {
    fontSize: 68,
    color: 'green',
    // paddingTop: 25,
  },
  input: {
    height: 80,
    width: '90%',
  },
  ageContainer: {
    width: 102, height: 82,
    // fontWeight: 'bold',
  },
  picker: {
    width: 100, height: 50,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'IRANYekanRDMobile'
  }
})
export default Profile