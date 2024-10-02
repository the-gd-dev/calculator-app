import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface ContainerPropsTypes {
  children?: any;
}

const Container: React.FC = ({children}: ContainerPropsTypes) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      colors={['#e7a948', '#000000']}
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      {children}
    </LinearGradient>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: StatusBar.currentHeight,
  },
});
