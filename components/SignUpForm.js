import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import axios from 'axios';
import keys from '../config/keys';

// const ROOT_URL = 'https://us-central1-one-time-password-c725a.cloudfunctions.net';
const ROOT_URL = keys.rootURL;
class SignUpForm extends Component {
  state = { phone: '' };

  handleSubmit = async () => {
    // Create a user
    await axios
      .post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      .then((res) => {
        console.log('creatUser res: ' + JSON.stringify(res.data, null, 4));
      })
      .catch((err) => {
        console.log('creatUser err: ' + err);
      });

    // Once user is created request a one time password
    await axios
      .post(`${ROOT_URL}/requestOTP`, { phone: this.state.phone })
      .then((res) => {
        console.log('requestOTP res: ' + JSON.stringify(res.data, null, 4));
      })
      .catch((err) => {
        console.log('requestOTP err: ' + err);
      });
  };

  render() {
    return (
      <View style={{ width: '80%' }}>
        <Card>
          <Card.Title>SIGN UP FORM</Card.Title>
          <Card.Divider />
          <View style={{ marginBottom: 10, alignItems: 'center' }}>
            <Text>Enter Phone Number</Text>
            <Input
              placeholder="+(91)0123456789"
              value={this.state.phone}
              onChangeText={(phone) => this.setState({ phone })}
            />
          </View>
          <Button onPress={this.handleSubmit} title="Submit" />
        </Card>
      </View>
    );
  }
}

export default SignUpForm;
