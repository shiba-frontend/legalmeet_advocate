import {Image, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import {ICON, IMAGE} from '../utils/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {selectedAuctionRequest} from '../redux/reducer/PostReducer';

const ClosedAuctionObject = props => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  function isEmpty(item) {
    if (item == null || item == '' || item == undefined) return true;
    return false;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(props?.item);
        if (AuthReducer?.loginAs == 'Seller') {
          props.navigation.navigate('SellerAuctionDetail', {item: props?.item});
        } else {
          dispatch(selectedAuctionRequest(props?.item));
          props.navigation.navigate('BuyerAuctionDetail');
        }
      }}>
      {/* {props?.item?.end_Time > new Date()? */}
      <View
        style={{
          backgroundColor: '#FFF',
          width: '100%',
          padding: 10,
          borderRadius: 10,
          marginVertical: props?.index != 0 ? 10 : 0,
          flexDirection: 'row',
        }}>
        <Image
          source={IMAGE.live_auction_pic}
          style={{height: 100, width: 80, borderRadius: 10}}
        />
        <View style={{marginLeft: 5}}>
          <Text style={{color: '#000', fontWeight: '800', fontSize: 14}}>
            {props?.item?.product_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              padding: 2,
              borderBottomWidth: 1,
              borderBottomColor: '#D9D9D9',
            }}>
            <Text style={{color: '#666666', fontSize: 12}}>Base Price: </Text>
            <Text style={{color: '#E42634', fontWeight: '800', fontSize: 12}}>
              $ {props?.item?.bid_amount}
            </Text>
            {!isEmpty(props?.item?.my_bid) &&
            !isEmpty(props?.item?.my_bid?.[0]) ? (
              <Text style={{color: '#666666', fontSize: 12, marginLeft: 2}}>
                My Bid:{' '}
              </Text>
            ) : null}
            {!isEmpty(props?.item?.my_bid) &&
            !isEmpty(props?.item?.my_bid?.[0]) ? (
              <Text style={{color: '#E42634', fontWeight: '800', fontSize: 12}}>
                $ {props?.item?.my_bid?.[0].bid_price}
              </Text>
            ) : null}
            {!isEmpty(props?.item?.down_arrow) ? (
              <Image
                source={props?.item?.is_up ? ICON.up_arrow : ICON.down_arrow}
                style={{height: 20, width: 15}}
                resizeMode="contain"
              />
            ) : null}
          </View>
          <View style={{marginLeft: 5, flexDirection: 'row', paddingTop: 5}}>
            <View
              style={{
                width: '42%',
                borderRightWidth: 1,
                borderRightColor: '#D9D9D9',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#E42634', transform: [{rotate: '-5deg'}]}}>
                Auction Closed
              </Text>
            </View>
            <View
              style={{
                width: '58%',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#E42634',
                  padding: 5,
                  borderRadius: 20,
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 12, color: '#FFF'}}>
                  {props?.item?.total_bidders}
                </Text>
              </View>
              <View style={{marginLeft: 5}}>
                <Text style={{fontSize: 12, color: '#000', fontWeight: '800'}}>
                  Participated
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* :null} */}
    </TouchableOpacity>
  );
};

export default ClosedAuctionObject;

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
