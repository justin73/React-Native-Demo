import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import WebBrowser from './Helpers/Web_View'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  starts: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

export default class Repositories extends Component {
  openPage(url) {
    this.props.navigator.push({
      component: WebBrowser,
      title: 'Web View',
      passProps: {url}
    })
  }
  render() {
    const repos = this.props.repos;
    const list = repos.map((item, index)=>{
      const desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text> : <View/>;
      return (
        <View key={index}>
          <View  style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repos[index].html_url)}
              underlayColor="transparent">
              <Text>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text>Stars: {repos[index].stargazers_count}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    })
    return (
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled>
        <Badge userInfo={this.props.userInfo}/>
        {list}
      </ScrollView>
    )
  }
}