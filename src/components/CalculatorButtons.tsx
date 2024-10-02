import {StyleSheet, View} from 'react-native';
import React from 'react';
import CalculatorBtn from './CalculatorBtn';
import {useThemeContext} from '../context/ThemeContext';

const calculatorButtons = [
  ['AC', '+/-', '%', '/'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const CalculatorButtons: React.FC<{
  onButtonPress: (v: number | string) => void;
}> = ({onButtonPress}) => {
  const {isDarkMode} = useThemeContext();
  return (
    <View
      style={[
        styles.buttonsArea,
        isDarkMode ? styles.darkButtons : styles.lightButtons,
      ]}>
      {calculatorButtons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.calculatorRow}>
          {row.map((num, buttonIndex) => (
            <CalculatorBtn
              key={`${rowIndex}-${buttonIndex}`}
              num={num}
              onPress={() => onButtonPress(num)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default CalculatorButtons;

const styles = StyleSheet.create({
  buttonsArea: {
    width: '100%',
  },
  lightButtons: {
    backgroundColor: '#FFF',
  },
  darkButtons: {
    backgroundColor: '#333',
  },
  calculatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
