//import liraries
import React from 'react';
import {StatusBar, Platform, StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../Theme';

const MyStatusBar = ({backgroundColor, barStyle, ...props}) => (
  <SafeAreaView style={Platform.OS === 'ios' && [{backgroundColor}]}>
    <StatusBar
      translucent={false}
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      hidden={false}
    />
  </SafeAreaView>
);

export default MyStatusBar;
MyStatusBar.propTypes = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.string,
  height: PropTypes.number,
};

MyStatusBar.defaultProps = {
  backgroundColor: COLORS.WhiteBg,
  barStyle: 'light-content',
};
