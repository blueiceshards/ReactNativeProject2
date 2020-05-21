import React, { useState, useRef, useEffect } from 'react'; // useRef generates values that survive component rerendering. 
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/DefaultStyles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

// first argument will be arguments you set up in bind, i.e. pastGuesses.length. any other arguments will be passed as additional arguments at the end. itemData you are getting automatically by React Native is an object that has property index and item (that is the guess iteself). 
const renderListItem = (listLength, itemData) => (
    <View /* key={value}  */style={styles.listItem}>
        <BodyText>#{listLength-itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);


const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }

    }, [currentGuess, userChoice, onGameOver]); // first is your function, second input is your array of dependencies of the function. 

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that that is wrong...', [{ text: 'Sorry', style: 'cancel' } /* make sure no incorrect hints are given */
            ]);
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);  // our current max and min should adjust over time according to hints. 
        setCurrentGuess(nextNumber);
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
        //setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
{/*                 <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                keyExtractor={(item)=> item} 
                data = {pastGuesses} 
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },

    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between', // identifies how content of this view is laid along the main axis, for row that's the horizontal axis. 
        width: '100%' // will be at the side because scrollview is also a flexbox, must edit scrollview style to make stuff centered. 
    }, 

    listContainer: {
        flex: 1, // android: need flex 1 around component surrounding scrollview contentContainerStyle to enable scrolling.
        width: '60%',
        marginTop: 10
    },
    // to control height/width of scrollview, you must style the scrollview in a parent view (not directly to scrollview!), do not add styles to the inidividual list items.
    list: {
        //alignItems: 'center',
        justifyContent: 'flex-end', 
        flexGrow: 1 // tell container to be able to grow, and take as much space as it can. is like flex but more flexible, good for scrollView. 
    } 
});

export default GameScreen;

// .bind(this, ...) first argument should be what this is referring to in the function that is being called, doesn't matter here, second value is first argumetn received by our function. 