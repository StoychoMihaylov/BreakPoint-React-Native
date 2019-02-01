import React from 'react'
import {
  View,
  Image,
  FlatList,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { ImagePicker } from 'expo'
import {
  widthPercentageToDP as wp,
   heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Avatar from '../../components/Avatar'
import baseUrl from '../../constants/api'

export default class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      dataSource: null,
      avatar: 'default',
      isLoading: true
    }
  }

  static navigationOptions = {
    headerTitle: 'Profile',
  };

  //On screen opening
  //Get the "user auth token" from "async storage" and fetching user info from API.
  componentWillMount() {
    AsyncStorage.getItem("userToken").then((token) => {
      this._getUserData(token)

      //Set "token state"
      this.setState({
        token: token
      })
    }).done()
  }

  componentDidMount(){
    AsyncStorage.getItem("userToken").then((token) => {
      this._getUserData(token)

      //Set "token state"
      this.setState({
        token: token
      })
    }).done()
  }

  _getUserData(token) {
    return fetch(baseUrl + '/api/profile/GetUserInfo',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
    }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON.Posts)
      this.setState({
        isLoading: false,
        dataSource: responseJSON,
      })
      if (responseJSON.Avatar != null){
        this.setState({
          avatar: responseJSON.Avatar
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  _changeProfileAvatar(avatar) {
    fetch(baseUrl + '/api/profile/ChangeProfileAvatar',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        stringBase64: avatar
      })
    })
    .then((response) => {
    console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  //New Post
  _pickImageFromThePhone = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      this.props.navigation.navigate('CreateNewPost', {newPostBase64Image: result})
    }
  };

  //Onclick
  _pickNewAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true
    });
    //Fetching API with the new "avatar".
    if (!result.cancelled) {
      this._changeProfileAvatar(result.base64)
      this.setState({ avatar: result.base64 })
    }
  };

  render() {
    if (this.state.isLoading){
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }else {
      return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View>
                <View style={styles.userInfoContainer}>
                  <View style={styles.avatar}>
                    <Avatar  avatarImg={this.state.avatar} />
                    <View style={styles.avatarButton}>
                      <Text style={styles.avatarAddBtn} onPress={this._pickNewAvatar}>+</Text>
                    </View>
                    <View>
                      <Text style={styles.centeredText}>{this.state.dataSource.Location}</Text>
                    </View>
                  </View>
                  <View style={styles.userInfo}>
                    <View>
                      <Text style={[styles.nichname, styles.textPadding]}>{this.state.dataSource.DancerType} {this.state.dataSource.Nickname}</Text>
                    </View>
                    <View style={styles.inlineBox}>
                      <View style={styles.sicialInfo}>
                        <Text style={[styles.centeredText, styles.boldText]}>{this.state.dataSource.PostsCount}</Text>
                        <Text style={[styles.centeredText, styles.textColor]}>Posts</Text>
                      </View>
                      <View style={styles.sicialInfo}>
                        <Text style={[styles.centeredText, styles.boldText]}>{this.state.dataSource.FollowersCount}</Text>
                        <Text style={[styles.centeredText, styles.textColor]}>Followers</Text>
                      </View>
                      <View style={styles.sicialInfo}>
                        <Text style={[styles.centeredText, styles.boldText]}>{this.state.dataSource.Skilled}</Text>
                        <Text style={[styles.centeredText, styles.textColor]}>Skilled</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.biography}>
                    <Text>{this.state.dataSource.Biography}</Text>
                </View>
                <Button title="Add new post" onPress={this._pickImageFromThePhone} />
            </View>
            <View style={styles.hr}/>
            <View>
              <FlatList
                numColumns={3}
                data={this.state.dataSource.Posts}
                renderItem={({ item }) =>
                  <View>
                    <TouchableOpacity onPress={() => alert(item.Id)}>
                      <Image
                          style={styles.postImage}
                          source={{uri:`data:image/png;base64,${item.SourcePath}`}}
                      />
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={item => item.Id.toString()}
                />
            </View>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  postImage:{
    height:hp('15%'),
    width:wp('35%'),
    margin:1
  },
  hr:{
    marginTop:10,
    marginBottom:10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  loader:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarAddBtn:{
    color: 'white',
  },
  avatarButton:{
    borderColor: 'white',
    borderWidth:2,
    marginLeft:wp('17%'),
    marginTop:-30,
    height:27,
    width:27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3399FF',
    borderRadius:100
  },
  biography:{
    flex:1,
    flexDirection: 'column',
    width:wp('100%'),
    paddingLeft:20,
    paddingRight:20,
  },
  textColor:{
    color: '#C0C0C0'
  },
  boldText:{
    fontWeight: 'bold',
  },
  sicialInfo:{
    padding: 10,
  },
  centeredText:{
    textAlign: 'center',
  },
  textPadding:{
    padding:5
  },
  inlineBox: {
    flex:1,
    flexDirection: 'row'
  },
  avatar: {
    alignItems: 'center',
    width:wp('35%'),
    height:hp('25%'),
  },
  userInfo: {
    padding:10,
    width:wp('65%'),
    height:hp('25%'),
  },
  userInfoContainer: {
    height:hp('25%'),
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nichname:{
    fontSize:20,
  },
})