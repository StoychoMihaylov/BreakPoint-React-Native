import React from 'react'
import { View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  AsyncStorage,
  Image
} from 'react-native'
import {
    widthPercentageToDP as wp,
     heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import baseUrl from '../../constants/api'

export default class CreateNewPostScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      source: '',
      description: '',
      location: '',
      token: ''
    }
  }

  static navigationOptions = {
    title: 'Create New Post'
  }

  componentWillMount() {
    AsyncStorage.getItem("userToken").then((value) => {
      this.setState({
        //Getting data from prev screen(ProfileScreen)
        source: this.props.navigation.state.params.newPostBase64Image,
        token: value
      })
    }).done()
  }

  _fetchCreateNewPost() {
    const apiUrl = baseUrl + 'api/profile/UploadImagePost'
    const uri = this.state.source.uri
    const uriParts = uri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    const formData = new FormData()
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    })

    let options = {
      method: 'POST',
      body: formData,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: this.state.token,
          location: this.state.location,
          description: this.state.description
          }
    }

    return fetch(apiUrl, options)
      .then((response) => {
        if(response.ok){
          this.props.navigation.navigate('Profile')
        }else if(!response.ok){
          alert("Ups, error with this Image :(");
          console.log(response)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //</TouchableOpacity><TouchableOpacity onPress={this._fetchCreateNewPost}>

  render() {
    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.agreementField}>
          <View>
            <TouchableOpacity>
              <Text style={styles.escBtn} onPress={() => this.props.navigation.navigate('Profile')}>X</Text>
            </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity onPress={() => this._fetchCreateNewPost()}>
              <Text style={styles.acceptBtn}>✓</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{padding:5}}>
            <Image
              style={styles.image}
              source={{uri:`data:image/png;base64,${this.state.source.base64}`}}
            />
          </View>
          <View style={styles.textAreaContainer} >
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={1}
              multiline={true}
              onChangeText={(text) => this.setState({description:text})}
            />
          </View>
        </View>
        <View>
          <View>
            <TextInput
                style={styles.input}
                placeholder="Location"
                underlineColorAndroid= '#C0C0C0'
                onChangeText={(text) => this.setState({location:text})}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  image:{
    height: hp('20%'),
    width: wp('40%'),
    borderRadius:5,
  },
  escBtn:{
    color: 'red',
    marginLeft: wp('1%'),
    fontSize:35,
    backgroundColor:'transparent',
  },
  acceptBtn:{
    color:'#3399FF',
    fontSize:35,
    backgroundColor:'transparent',
    marginLeft:wp('85%'),
  },
  agreementField:{
    flex: 1,
    flexDirection: 'row',
    width: wp('100%'),
    borderBottomWidth:1,
    borderBottomColor:'#C0C0C0',
  },
  input:{
    width:wp('70%'),
    fontSize:20,
    margin:10,
    padding:3,
    borderRadius:5,
    borderColor: '#C0C0C0',
  },
  container:{
    flex:1,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
  },
  textAreaContainer: {
    padding: 5
  },
  textArea: {
    height: hp('20%'),
    width: wp('50%'),
    justifyContent: "flex-start"
  },
})