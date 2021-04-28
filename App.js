import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import keys from './config/keys';

class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: keys.apiKey,
      authDomain: keys.authDomain,
      databaseURL: keys.databaseURL,
      projectId: keys.projectId,
      storageBucket: keys.storageBucket,
      messagingSenderId: keys.measurementId,
      appId: keys.appId,
      measurementId: keys.measurementId,
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default App;
