import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useThemeContext} from '../context/ThemeContext';

interface CalculatorBtnPropTypes {
  onPress?: () => void;
  num?: string;
}

const CalculatorBtn: React.FC<CalculatorBtnPropTypes> = ({onPress, num}) => {
  const {isDarkMode} = useThemeContext();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        isDarkMode
          ? styles.buttonContainerDarkThemeBorder
          : styles.buttonContainerLightThemeBorder,
        num === '0' ? styles.buttonWide : null,
      ]}>
      <View
        style={
          !isDarkMode ? styles.buttonBackgroundDark : styles.buttonBackground
        }>
        <Text style={!isDarkMode ? styles.buttonTextDark : styles.buttonText}>
          {num}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CalculatorBtn;

const styles = StyleSheet.create({
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
  buttonWide: {
    flex: 2,
  },
});
