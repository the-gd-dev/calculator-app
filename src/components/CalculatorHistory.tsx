import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ClearHistory from './ClearHistory';
import {useThemeContext} from '../context/ThemeContext';

const CalculatorHistory: React.FC<{
  onClearHistory: () => void;
  data: string[];
}> = ({data = [], onClearHistory}) => {
  const {isDarkMode} = useThemeContext();
  return (
    <View style={styles.calculationHistory}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Text
            style={[
              styles.historyTextBase,
              isDarkMode ? styles.historyTextDark : styles.historyTextLight,
            ]}>
            {item}
          </Text>
        )}
      />
      {data.length > 0 && <ClearHistory onPress={onClearHistory} />}
    </View>
  );
};

export default CalculatorHistory;

const styles = StyleSheet.create({
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
});
