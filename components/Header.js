import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    );

};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;


// you can technically style text but you should wrap it in view as well for more styling flexibility.

// alignItems and justifyContent controls the styling of the children elements in this case text. 