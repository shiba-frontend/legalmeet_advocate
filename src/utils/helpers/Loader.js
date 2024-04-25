import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../Theme';
import normalize from './normalize';

export default function Loader(props) {
  return props.visible ? (
    <View style={styles.container}>
      <View style={{
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        gap:normalize(5),
        paddingHorizontal:normalize(20),
        paddingVertical:normalize(15),
        borderRadius:normalize(5),
        width:'70%'
        }}>
          <ActivityIndicator color={'#222'} size={'small'} />
        <Text style={{color:'#222', fontSize:normalize(13)}}> Loading...</Text>
      </View>
      
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
