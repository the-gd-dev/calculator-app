import React, {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const calculatorButtons = [
  ['AC', '+/-', '%', '/'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Manual dark mode state
  const [calculationHistory, setCalculationHistory] = useState<any>([]);

  const handleClick = (value: any) => {
    if (value === 'AC') {
      if (result) {
        setCalculationHistory([
          ...calculationHistory,
          `${num1} ${operator} ${num2} = ${result}`,
        ]);

        setNum1('');
        setNum2('');
        setOperator('');
        setResult('');
      }

      return;
    }

    if (value === '=') {
      performCalculation();
      return;
    }

    if (['+', '-', 'x', '/'].includes(value)) {
      if (num1) {
        setOperator(value);
      }
      return;
    }

    if (value === '+/-') {
      if (!operator) {
        setNum1(prevNum => String(parseFloat(prevNum) * -1));
      } else {
        setNum2(prevNum => String(parseFloat(prevNum) * -1));
      }
      return;
    }

    if (value === '%') {
      if (!operator) {
        setNum1(prevNum => String(parseFloat(prevNum) / 100));
      } else {
        setNum2(prevNum => String(parseFloat(prevNum) / 100));
      }
      return;
    }

    if (!operator) {
      if (!(num1.includes('.') && value === '.')) {
        setNum1(prevNum => `${prevNum}${value}`);
      }
    } else {
      if (!(num2.includes('.') && value === '.')) {
        setNum2(prevNum => `${prevNum}${value}`);
      }
    }
  };

  const performCalculation = () => {
    if (!num1 || !num2 || !operator) return;

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let calcResult: number | string = 0;

    switch (operator) {
      case '+':
        calcResult = number1 + number2;
        break;
      case '-':
        calcResult = number1 - number2;
        break;
      case 'x':
        calcResult = number1 * number2;
        break;
      case '/':
        calcResult = number2 !== 0 ? number1 / number2 : '';
        break;
      default:
        return;
    }
    if (calcResult.toString().includes('.')) {
      setResult(Number(calcResult).toFixed(2).toString());
    } else {
      setResult(calcResult.toString());
    }

    setNum1(calcResult.toString());
    // setNum2('');
    // setOperator('');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState); // Toggle the dark mode state
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={isDarkMode ? ['#1a1a1a', '#333333'] : ['#d4a15a', '#ffffff']}
        style={styles.gradientBackground}>
        {/* Toggle for Dark Mode */}
        <View style={styles.toggleContainer}>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? '#fff' : '#000'}
            trackColor={{false: '#ddd', true: '#555'}}
          />
        </View>

        {/* Display Area */}
        <View style={styles.calculationArea}>
          <View style={styles.calculationHistory}>
            <FlatList
              data={calculationHistory}
              renderItem={({item}) => (
                <Text
                  style={[
                    styles.historyTextBase,
                    isDarkMode
                      ? styles.historyTextDark
                      : styles.historyTextLight,
                  ]}>
                  {item}
                </Text>
              )}
            />
            {calculationHistory.length > 0 && (
              <TouchableOpacity
                onPress={() => setCalculationHistory([])}
                style={[
                  styles.clearHistoryBtn,
                  isDarkMode
                    ? styles.clearHistoryBtnDark
                    : styles.clearHistoryBtnLight,
                ]}>
                <Text
                  style={[
                    styles.clearHistoryText,
                    isDarkMode
                      ? styles.clearHistoryTextDark
                      : styles.clearHistoryTextLight,
                  ]}>
                  Clear History
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              numberOfLines={1}
              style={[
                styles.resultText,
                isDarkMode ? styles.textDark : styles.textLight,
              ]}>
              {result || `${num1}${operator}${num2}`}
            </Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View
          style={[
            styles.buttonsArea,
            isDarkMode ? styles.darkButtons : styles.lightButtons,
          ]}>
          {calculatorButtons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.calculatorRow}>
              {row.map((num, buttonIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${buttonIndex}`}
                  onPress={() => handleClick(num)}
                  style={[
                    styles.buttonContainer,
                    isDarkMode
                      ? styles.buttonContainerDarkThemeBorder
                      : styles.buttonContainerLightThemeBorder,
                    num === '0' ? styles.buttonWide : null,
                  ]}>
                  <View
                    style={
                      !isDarkMode
                        ? styles.buttonBackgroundDark
                        : styles.buttonBackground
                    }>
                    <Text
                      style={
                        !isDarkMode ? styles.buttonTextDark : styles.buttonText
                      }>
                      {num}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  clearHistoryBtn: {
    borderRadius: 18,
    width: 100,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  clearHistoryBtnLight: {
    backgroundColor: '#ffffff',
  },
  clearHistoryBtnDark: {
    backgroundColor: '#ffffff',
  },
  clearHistoryText: {},
  clearHistoryTextLight: {},
  clearHistoryTextDark: {},
  calculationHistory: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 3,
    width: '100%',
    marginBottom: 20,
  },
  historyTextBase: {
    fontSize: 18,
    textAlign: 'right',
  },
  historyTextDark: {
    color: '#c3c3c3',
  },
  historyTextLight: {
    color: '#777',
  },
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  toggleContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  calculationArea: {
    width: '100%',
    height: Dimensions.get('screen').height / 3.5,
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
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
  buttonsArea: {
    width: '100%',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingHorizontal: 10,
    // paddingVertical: 15,
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
    // marginBottom: 10,
  },
  buttonContainerLightThemeBorder: {
    borderRightColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
  },
  buttonContainerDarkThemeBorder: {
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
  },
  buttonContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    // marginHorizontal: 5,
    height: Dimensions.get('screen').height / 12,
  },
  buttonWide: {
    flex: 2,
  },
  buttonBackgroundDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    backgroundColor: '#fff', // Can be adjusted for light/dark modes
  },
  buttonBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    backgroundColor: '#444', // Can be adjusted for light/dark modes
  },
  buttonTextDark: {
    fontSize: 28,
    fontWeight: '500',
    color: '#555', // Adjust for different themes
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#FFF', // Adjust for different themes
  },
});

export default App;
