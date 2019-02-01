import React from 'react'
import {
    View,
    Button,
    Text,
    TextInput,
    Picker,
    StyleSheet,
    ScrollView
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import baseUrl from '../../constants/api'
import ErrorMessage from '../../components/ErrrorMessage'

export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          nickname: '',
          location: '',
          dancerType: '',
          email: '',
          password: '',
          confirmPassword: '',
          error: '',
      }
    }

    static navigationOptions = {
        title: 'Regiter in',
    };

    _showLogInPage = () => {
        this.props.navigation.navigate('Login');
    };

    _registerInAsync = async () => {
        console.log(this.state)
        if (this.state.dancerType == "none" || this.state.dancerType == ""){
            alert("Please select dancer type!");
            return
        }
        fetch(baseUrl + '/api/Account/Register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                nickname: this.state.nickname,
                location: this.state.location,
                dancerType: this.state.dancerType,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Successful registered')

                this.props.navigation.navigate('Login')
            }else {
                let err = 'Invalid credentials, maybe your "email" already exist or confirm password does'+ "'t"+ ' match your password'
                this.setState({ error: err })
                console.log(this.state.error)
            }
        })
        .catch(function(error) {
            console.log(error);
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
                                placeholder="Nickname"
                                underlineColorAndroid= 'transparent'
                                onChangeText={(text) => this.setState({nickname: text})}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Location"
                                underlineColorAndroid= 'transparent'
                                onChangeText={(text) => this.setState({location: text})}
                            />
                        </View>
                        <Picker
                            style={styles.input}
                            selectedValue={this.state.dancerType}
                            style={{ height: 50, width: 100 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({dancerType: itemValue})}>
                            <Picker.Item label="Select" value="none" />
                            <Picker.Item label="Bboy" value="Bboy" />
                            <Picker.Item label="Bgirl" value="Bgirl" />
                        </Picker>
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
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                underlineColorAndroid= 'transparent'
                                onChangeText={(text) => this.setState({confirmPassword: text})}
                            />
                        </View>
                        <View>
                            <Button style={{borderRadius:5}} title="Register!" onPress={this._registerInAsync} />
                            <ErrorMessage message={this.state.error} />
                            <View style={{padding:5}}>
                                <Text style={styles.centeredText}>OR</Text>
                                <Text style={[styles.link, styles.centeredText]} onPress={this._showLogInPage}>LOGIN</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
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
        paddingTop:10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
