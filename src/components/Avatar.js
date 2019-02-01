import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Avatar extends React.Component {
    render() {
        if (this.props.avatarImg.length < 10){
            return (
                <View style={styles.container}>
                    <Image style={styles.image}
                    source={require('../assets/images/defaultAvatar.png')}
                    />
                </View>
            );
        }else {
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{uri:`data:image/png;base64,${this.props.avatarImg}`}}
                     />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width:102,
        height:102,
        margin:10,
        borderRadius:100,
        borderColor: '#C0C0C0',
        borderWidth:1,
    },
    image: {
        width:100,
        height:100,
        borderRadius:100,
    },
});