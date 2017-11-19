import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Profile from "./Profile";
import Repositories from './Repositories';
import api from '../Utils/api';
import Notes from './Notes';

export default class Dashboard extends Component {
  makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj
  }

  goToProfile() {
    userInfo = this.props.userInfo;
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: {userInfo}
    })
  }

  goToRepos() {
    userInfo = this.props.userInfo;

    //fetch data from github
    api.getRepos(this.props.userInfo.login)
    .then((res) => {
      this.props.navigator.push({
        title: 'Repositories',
        component: Repositories,
        passProps: {
          userInfo,
          repos: res
        }
      })
    })
  }

  goToNotes() {
    api.getNotes(this.props.userInfo.login)
      .then(res => {
        res = res || {}
        this.props.navigator.push({
          component: Notes,
          title: 'Notes',
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        })
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight 
          style={this.makeBackground(0)} 
          onPress={this.goToProfile.bind(this)} >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={this.makeBackground(1)} 
          onPress={this.goToRepos.bind(this)} >
            <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={this.makeBackground(2)} 
          onPress={this.goToNotes.bind(this)} >
            <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});
    