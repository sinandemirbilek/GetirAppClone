import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import productsGetir from "../../../assets/productsGetir";
import { Product } from "../../models";
import CartItem from "../../components/CartItem";
import ProductItem from "../../components/ProductItem";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");





function index({
  cartItems,
  route
}: {
  cartItems: { product: Product; quantity: number }[],route:any;
}) {
  //const [cartItems,setCartItems] = useState<Product[]>()
 
  console.log("Zınk route params are ",route.params)
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const getProductsPrice = () => {
    let total = 0;
    cartItems.forEach((product) => {
      total += product.product.fiyat;
      setTotalPrice(total);
    });
  };
  useEffect(() => {
    getProductsPrice();
    return (() => {
      setTotalPrice(0)
    })
  }, [cartItems]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={cartItems}
        renderItem={({ item }) => <CartItem product={item.product} quantity= {item.quantity}/>}
      />
      <View style={{flex:1}}>
      <Text style={{ padding: 15, fontWeight: 'bold', color: '#5D3EBD' ,}}>
        Önerilen Ürünler
      </Text>
      <ScrollView style={{backgroundColor:'white',}} showsHorizontalScrollIndicator={false} bounces={true} horizontal={true} >
        {productsGetir.map((item,index) => (
          <ProductItem index={item.id} item={item} />
        ))}
      </ScrollView>
      </View>
      
     
      <View
        style={{
          height: height * 0.2,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: '4%',
          backgroundColor: '#fefefe',
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: height * 0.1,
            flex: 3,
            backgroundColor: '#5D3EBD',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 8,
            borderTopLeftRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
            Devam
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: '#5D3EBD',
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            <Text>{'\u20BA'}</Text>
            {totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  const {cartItems} =state;
  return {
    cartItems:cartItems
  }
}

export default connect(mapStateToProps,null)(index);
