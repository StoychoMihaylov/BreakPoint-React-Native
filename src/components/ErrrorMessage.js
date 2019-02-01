import React from 'react'
import { View, Text } from 'react-native'

export default class ErrorMessage extends React.Component {
    render() {
        if (this.props.message === '') {
            return(
                <View>
                </View>
            )
        }else {
            return(
                <View>
                    <Text style={{ backgroundColor: "red", color: "white" }}>
                        {this.props.message}
                    </Text>
                </View>
            );
        }
    }
}
