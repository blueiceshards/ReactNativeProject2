import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    // source={require('../assets/success.png')}
                    source={{ uri: 'https://www.yourdictionary.com/images/definitions/lg/12337.summit.jpg' }}
                    style={styles.image}
                    resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style= {styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderRadius: 150, // half of your square width and height. 
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;

// cover: crops image, contain: does not crop
// you can nest text in text.  You can also technically nest Views in Text but there are some caveats/issues that you may face. special: for text components, style is passed down to nested text components (but not the same for view). View uses flexbox, text does not use flexbox. text uses its own positioning system - autmatically wraps itself into a new line. if it doesn't fit into one line. if we want text to be centered, we need to use textAlign. 

// View vs Text

/* <View> vs <Text> - A Summary
<Text> and <View> are probably THE most important/ most-used components built into React Native.

---

<View> is your #1 component if you need to group and structure content (= provide a layout) and/ or if you want to style something as a container (e.g. the <Card> look we built in our custom <Card> component).

<View> uses Flexbox to organize its children - have a look at the Flexbox deep dive earlier in this course (in module 2) to learn more about how that works.

A <View> can hold as many child components as you need and it also works with any kind of child component - it can hold <Text> components, other <View>s (for nested containers/ layouts), <Image>s, custom components etc.

If you need scrolling, you should consider using a <ScrollView> - you could wrap your <View> with it or replace your <View> (that depends on your layout and styling). Please note, that due to its scrollable nature, Flexbox works a bit differently on a <ScrollView>: https://stackoverflow.com/questions/46805135/scrollview-with-flex-1-makes-it-un-scrollable

---

<Text> is also super important. As its name suggests, you use it for outputting text (of any length). You can also nest other <Text> components into a <Text>. Actually, you can also have nested <View>s inside of a <Text> but that comes with certain caveats you should watch out for: https://github.com/facebook/react-native/commit/a2a03bc68ba062a96a6971d3791d291f49794dfd

Unlike <View>, <Text> does NOT use Flexbox for organizing its content (i.e. the text or nested components). Instead, text inside of <Text> automatically fills a line as you would expect it and wraps into a new line if the text is too long for the available <Text> width.

You can avoid wrapping by setting the numberOfLines prop, possibly combined with ellipsizeMode.

Example:

<Text numberOfLines={1} ellipsizeMode="tail">
  This text will never wrap into a new line, instead it will be cut off like this if it is too lon...
</Text>
Also important: When adding styles to a <Text> (no matter if that happens via inline styles or a StyleSheet object), the styles will actually be shared with any nested <Text> components.

This differs from the behavior of <View> (or actually any other component - <Text> is the exception): There, any styles are only applied to the component to which you add them. Styles are never shared with any child component! */