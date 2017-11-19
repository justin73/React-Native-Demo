import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

export default class WebBrowser extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView url={this.props.url} />
      </View>
    )
  }
}