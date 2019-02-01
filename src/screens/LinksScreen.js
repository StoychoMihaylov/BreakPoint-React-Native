import React from 'react'
import { ScrollView, StyleSheet, View, Button, AsyncStorage } from 'react-native'
import CircleButton from 'react-native-circle-button'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Links',
  };

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
                <CircleButton
                  size={45}
                  primaryColor='rgba(39, 38, 38, 0.3)'
                  secondaryColor='rgba(39, 38, 38, 0.3)'
                />
          </View>
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </ScrollView>
    );
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
