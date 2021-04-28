import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';
import { Alert } from 'react-native';
import keys from '../config/keys';

// const ROOT_URL = 'https://us-central1-one-time-password-c725a.cloudfunctions.net';
const ROOT_URL = keys.rootURL;
class SignInForm extends Component {
  state = { phone: '', code: '' };

  handleSubmit = async () => {
    // Fetch data.token
    await axios
      .post(`${ROOT_URL}/verifyOTP`, {
        phone: this.state.phone,
        code: this.state.code,
      })
      .then((res) => {
        console.log('verifyOTP res: ' + JSON.stringify(res.data, null, 4));
        firebase
          .auth()
          .signInWithCustomToken(res.data.token)
          .then((userCredential) => {
            Alert.alert('Sign In Sucessfull');
            console.log(
              'Sign In Sucessfull ' + JSON.stringify(userCredential, null, 4)
            );
          })
          .catch((err) => {
            console.log('Login err: ' + JSON.stringify(err, null, 4));
          });
      })
      .catch((err) => {
        console.log('verifyOTP err: ' + JSON.stringify(err, null, 4));
        Alert.alert('Sign In Failed');
      });
  };

  render() {
    return (
      <View style={{ width: '80%' }}>
        <Card>
          <Card.Title>SIGN IN FORM</Card.Title>
          <Card.Divider />
          <View style={{ marginBottom: 10, alignItems: 'center' }}>
            <Text>Enter Phone Number</Text>
            <Input
              placeholder="+(91)0123456789"
              value={this.state.phone}
              onChangeText={(phone) => this.setState({ phone })}
            />
          </View>

          <View style={{ marginBottom: 10, alignItems: 'center' }}>
            <Text>Enter Code</Text>
            <Input
              placeholder="0000"
              value={this.state.code}
              onChangeText={(code) => this.setState({ code })}
            />
          </View>
          <Button onPress={this.handleSubmit} title="Submit" />
        </Card>
      </View>
    );
  }
}

export default SignInForm;
