import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans',
        color: 'red'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    }
});

// Either use separate text components (TitleText.js) or import globally managed styles (DefaultStyles.js). global stylesheet you are not restricted to font-specific properties. you can manage any styles. 