import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ActivityIndicator
} from 'react-native';
import Dashboard from './Dashboard';
import api from '../Utils/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      isLoading: false,
      error: false
    }
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handleSubmit(event) {
    // Update our indicator IOS spinner
    this.setState({
      isLoading: true
    })

    //fetch data from github
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found') {
          this.setState({
            error: 'User Not Found',
            isLoading: false
          })
        } else {
          // retoute to the next passing that github information
          // if user exist then redirect to the next view, next route
          console.log('====================================')
          console.log(res)
          console.log('====================================')
          this.props.navigator.push({
            title: res.name || 'Select an Option',
            component: Dashboard,
            passProps: {userInfo: res}
          });
          
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      })

    
  }

  render() {
    let showError = (
      this.state.error ? <Text> {this.state.error} </Text>: <View></View>
    )
    return (
      <View style={styles.container}>
        <Text> Search for a Github User </Text>
        <TextInput style={styles.searchInput} value={this.state.username} onChange={this.handleChange.bind(this)} />
        <TouchableHighlight 
          style={styles.button} 
          onPress={this.handleSubmit.bind(this)}
          underlayColor = 'white'>
          <Text style={styles.buttonText}> SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading} 
          color="#111" 
          size="large"></ActivityIndicator>
        {showError}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      marginTop: 65,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#48BBEC'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center',
      color: '#fff'
    },
    searchInput: {
      height: 50,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  
  });
  