/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Container} from './src/components';
import LinearGradient from 'react-native-linear-gradient';

function App(): React.JSX.Element {
  const calculatorButtons: any = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState('');

  const handleClick = (number: any) => {
    if (number == 'AC') {
      setNum1('');
      setNum2('');
      return;
    }
  
    const containSymbol: boolean = ['%', '/', '*', '+', '-'].some(k => num1.includes(k));
  
    if (!['AC', '+/-', '='].includes(number) && !containSymbol) {
      if (!num1.includes('.') || /\d/.test(number)) {
        setNum1(prevNum => `${prevNum}${number}`);
      }
    } else {
      setNum2(prevNum => `${prevNum}${number}`);
    }
  };

  return (
    <Container>
      <View>
        {/* Calculation Area */}
        <View style={styles.calculationArea}>
          <Text>{num1}{num2}</Text>
        </View>
        {/* Calculator Buttons */}

        <View>
          {calculatorButtons.map((row: any, idx: any) => {
            return (
              <View style={styles.calculatorRow}>
                {row.map((num: any, idx2: any) => (
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    colors={['#e7a948', '#000000']}
                    style={{
                      ...styles.btnContainer,
                      width: num === '0' ? '50%' : '25%',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleClick(num)}
                      style={{
                        ...styles.btnContainer,
                        backgroundColor: 'white',
                        height: '100%',
                        width: '100%',
                      }}
                      key={'key-' + idx + idx2}>
                      <Text style={styles?.btn}>{num}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ))}
              </View>
            );
          })}
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  calculationArea: {
    height: Dimensions.get('screen').height / 2.4,
  },
  calculatorRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  btnContainer: {
    height: Dimensions.get('screen').height / 10,
    width: '25%',
    borderRightColor: '#dddbd8',
    borderRightWidth: 1,
    borderBottomColor: '#dddbd8',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    fontSize: Dimensions.get('screen').fontScale * 22,
    color: '#646564',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default App;
