import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useThemeContext} from '../context/ThemeContext';

interface ResultTypes {
  result: string;
  num1: string | number;
  num2: string | number;
  operator: string;
}

const Result: React.FC<ResultTypes> = ({result, num1, num2, operator}) => {
  const {isDarkMode} = useThemeContext();
  return (
    <View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        numberOfLines={1}
        style={[
          styles.resultText,
          isDarkMode ? styles.textDark : styles.textLight,
        ]}>
        {result ||
          (num1 || operator || num2 ? `${num1} ${operator} ${num2}` : '')}
      </Text>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  resultText: {
    fontSize: Dimensions.get('screen').fontScale * 60,
    fontWeight: '400',
    textAlign: 'right',
    height: 50,
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#FFF',
  },
});
