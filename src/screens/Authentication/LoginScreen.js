import React from 'react'
import {
  View,
  Button,
  AsyncStorage,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
}from 'react-native'
import {
    widthPercentageToDP as wp,
     heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import baseUrl from '../../constants/api'
import ErrorMessage from '../../components/ErrrorMessage'

export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props)
      this.component.forceUpdate(callback)

      this.state = {
          email: '',
          password: '',
          error: '',
      }
    }
  static navigationOptions = {
    title: 'Log in',
  };

    _showRegisterPage = () => {
        this.props.navigation.navigate('Register')
    }

    _signInAsync = async () => {
        return fetch(baseUrl + '/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
                },
            body: `grant_type=password&userName=${this.state.email}&password=${this.state.password}`
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.access_token != undefined ) {
                let token = 'Bearer ' + responseJSON.access_token;
                (async function() {
                    await setToken(token)
                })();

                this.props.navigation.navigate('App');
            }else {
                let err = responseJSON.error_description
                this.setState({ error: err })
                console.log("ERROR:" + err)
            }
        })
        .catch(function(error) {
            console.log(error)
        });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid= 'transparent'
                                onChangeText={(text) => this.setState({email: text})}
                            />
                        </View>

                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </View>
                        <View>
                            <Button style={{borderRadius:5}} title="LogIn!" onPress={this._signInAsync} />
                            <ErrorMessage message={this.state.error} />
                            <View style={{padding:5}}>
                                <Text style={styles.centeredText}>OR</Text>
                                <Text style={[styles.centeredText, styles.link]} onPress={this._showRegisterPage}>REGISTER</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

setToken = async (token) => {
    await AsyncStorage.setItem('userToken', token)
}

const styles = StyleSheet.create({
    link:{
        color: 'blue'
    },
    input:{
        width:wp('70%'),
        fontSize:20,
        margin:5,
        padding:3,
        borderRadius:5,
        borderColor: '#C0C0C0',
        borderWidth:1,
    },
    centeredText:{
        textAlign: 'center'
    },
    container:{
        paddingTop: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})