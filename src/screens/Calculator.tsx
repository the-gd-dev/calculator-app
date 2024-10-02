import React, {useState} from 'react';
import {Dimensions, StyleSheet, Switch, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/colors';
import {CalculatorButtons, Result, CalculatorHistory} from '../components';
import {gradientDark, gradientLight} from '../constants';
import {useThemeContext} from '../context/ThemeContext';

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');
  const {isDarkMode, toggleDarkMode} = useThemeContext();
  const [calculationHistory, setCalculationHistory] = useState<any>([]);

  const handleClick = (value: any) => {
    if (value === 'AC') {
      if (result) {
        setCalculationHistory([
          ...calculationHistory,
          `${formatDecimal(num1)} ${operator} ${formatDecimal(
            num2,
          )} = ${formatDecimal(result)}`,
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

  const formatDecimal = (number: string | number) => {
    return number.toString().includes('.')
      ? Number(number).toFixed(2).toString()
      : number.toString();
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
    setResult(formatDecimal(calcResult));
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={isDarkMode ? gradientDark : gradientLight}
        style={styles.gradientBackground}>
        {/* Toggle for Dark Mode */}
        <View style={styles.toggleContainer}>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? colors.white : colors.black}
            trackColor={{false: colors.medium_grey, true: colors.light_grey}}
          />
        </View>

        {/* Display Area */}
        <View style={styles.calculationArea}>
          <CalculatorHistory
            data={calculationHistory}
            onClearHistory={() => setCalculationHistory([])}
          />
          <Result num1={num1} num2={num2} result={result} operator={operator} />
        </View>

        {/* Buttons Section */}
        <CalculatorButtons
          onButtonPress={(num: number | string) => handleClick(num)}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Calculator;
