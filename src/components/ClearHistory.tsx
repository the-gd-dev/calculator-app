import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useThemeContext} from '../context/ThemeContext';

const ClearHistory: React.FC<{onPress: () => void}> = ({onPress}) => {
  const {isDarkMode} = useThemeContext();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.clearHistoryBtn,
        isDarkMode ? styles.clearHistoryBtnDark : styles.clearHistoryBtnLight,
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
  );
};

export default ClearHistory;

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
});
