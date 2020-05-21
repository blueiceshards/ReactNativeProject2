import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) { // if chosenNumber === NaN does not work, must wrap chosenNumber in isNaN.
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]); // style here is not stylesheet, it's from a set of predefineds.  
            return; // will not setEntered Value etc. 
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber) // convert text to number
        setEnteredValue(''); // 3 state changes are all batched together, setEnteredValue will only execute upon rerender, so you can technically switch the order of setSelectedNumber and setEnteredValue and it won't matter.  
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) { // state confirmed is true
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME!</MainButton>
            </Card>
        );
    }

    // cannot have <button title=""/> because MainButton passes props to children. 

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a new game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a number</BodyText>
                    <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold' // react native => must manually input bold font file, cannot change font weight. 
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center' // alignItems center items along cross-axis i.e. horizontally because default flexDirection is 'col' and 'col''s main axis is to to bottom. 
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15 //so buttons don't sit exactly at the horizontal edges of the container
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center' //default is stretch
    },
});

export default StartGameScreen;

// the screen here is unrelated and independent to screen in App.js, because they are 2 different JS objects that live in different files and do not interact. Just have the same naming convention for ease of understanding.  

// keyboard API lets us interact with the native devise.