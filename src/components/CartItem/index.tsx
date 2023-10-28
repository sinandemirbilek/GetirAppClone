import React from 'react';
import { View, Text, Image, Dimensions,TouchableOpacity } from 'react-native';
import { Product } from '../../models';
import { connect } from 'react-redux'
import * as actions from "../../redux/actions/cartAction"
type CartItemProps = {
  product: { product: Product; quantity: number };
  removeFromCart: (product: Product) => void;
};

const { width, height } = Dimensions.get('window');

function index({ product ,removeFromCart,quantity}: CartItemProps) {
  return (
    <View style={{ width: '100%', backgroundColor: 'white' }}>
      <View
        style={{
          width: '92%',
          borderBottomWidth: 0.4,
          borderBottomColor: 'lightgrey',
          height: height * 0.13,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: width * 0.04,
          backgroundColor: 'white',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: width * 0.16, height: height * 0.1,borderWidth:0.4,borderColor:'lightgrey',borderRadius:8 }}
            source={{ uri: product.image }}
          />

          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                maxWidth: width * 0.44,
              }}
            >
              {product.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 3,
                fontWeight: '600',
                color: '#848897',
              }}
            >
              {product.miktar}
            </Text>

            <Text
              style={{
                color: '#5D3EBD',
                fontWeight: 'bold',
                fontSize: 15,
                marginTop: 6,
              }}
            >
              <Text>{'\u20BA'}</Text>
              {product.fiyat}
            </Text>
          </View>
        </View>
        <View
          style={{
            shadowOpacity: 0.4,
            shadowColor: 'gray',
            flexDirection: 'row',
            width: width * 0.25,
            borderColor: 'lightgrey',
            borderWidth: 0.5,
            height: height * 0.035,
            borderRadius: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={()=> removeFromCart(product)} style={{ flex: 1, alignItems: 'center' }}>
            <Text>-</Text>
          </TouchableOpacity >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: '#5D3EBD',
              height: height * 0.033,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>
              {quantity}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>+</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product: Product) =>
      dispatch(actions.removeFromCart(product))
  };
};
export default connect(null, mapDispatchToProps)(index);