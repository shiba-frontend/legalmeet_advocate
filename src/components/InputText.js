import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, ICON} from '../utils/Theme';
import normalize from '../utils/helpers/normalize';

const InputText = props => {
  const [flag, setFlag] = useState(false);
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  return (
    <TouchableOpacity
      style={[
        props.inputStyle,
        {
          flexDirection: 'row',
          borderWidth: normalize(1),
          borderColor: COLORS.themeColor,
        },
      ]}
      onPress={() => {
        if (
          !isEmpty(props.selectBox) &&
          props.selectBox &&
          isEmpty(props.editable)
        ) {
          props.OnOpenModal(true);
        } else if (!isEmpty(props.editable) && props.editable) {
          props.OnOpenModal(false);
        }
      }}>
      {!isEmpty(props.beforeIcon) ? (
        <View
          style={{
            borderRightWidth: 1,
            borderRightColor: '#BBB',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginVertical: 10,
            marginRight: 10,
          }}>
          <Image
            source={props.beforeIcon}
            style={{height: 20, width: 20}}
            resizeMode="contain"
          />
        </View>
      ) : null}
      <TextInput
        textAlignVertical={
          props.textAlignVertical ? props.textAlignVertical : 'center'
        }
        placeholder={props.placeHolderText}
        value={props.value}
        onChangeText={item => {
          props.onChangingText(item);
        }}
        multiline={!isEmpty(props.numberOfLine)}
        editable={!!isEmpty(props.selectBox)}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        secureTextEntry={props.isPassword}
        numberOfLines={isEmpty(props.numberOfLine) ? 1 : props.numberOfLine}
        style={{
          width: '75%',
          textAlignVertical: !isEmpty(props.numberOfLine) ? 'top' : 'center',
          color: '#000',
        }}
      />

      {props.afterIcon == ICON.eye_on || props.afterIcon == ICON.eye_of ? (
        <TouchableOpacity
          style={{alignSelf: 'center', width: '15%'}}
          onPress={() => {
            if (
              props.afterIcon == ICON.eye_on ||
              props.afterIcon == ICON.eye_of
            ) {
              props.toggle(!flag);
              setFlag(!flag);
            }
          }}>
          <Image
            source={props.afterIcon}
            style={{height: 20, width: 20, alignSelf: 'flex-end'}}
          />
        </TouchableOpacity>
      ) : null}
      {!isEmpty(props.selectBox) && isEmpty(props.editable) ? (
        <View style={{alignSelf: 'center', position: 'absolute', right: 20}}>
          <Image
            source={props.afterIcon}
            style={{height: 10, width: 10, alignSelf: 'flex-end'}}
          />
        </View>
      ) : null}
      {!isEmpty(props.editable) ? (
        <View style={{alignSelf: 'center', position: 'absolute', right: 20}}>
          <Image
            source={props.afterIcon}
            style={{alignSelf: 'flex-end'}}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default InputText;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDCF60',
    width: '100%',
  },
  primary_label: {
    color: '#EDCF60',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  secondary: {
    backgroundColor: '#DEA845',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  secondary_label: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
