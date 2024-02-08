import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../Theme';

export default function Loader(props) {
  return props.visible ? (
    <View style={styles.container}>
      <ActivityIndicator color={'#E42634'} size={'large'} />
    </View>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
