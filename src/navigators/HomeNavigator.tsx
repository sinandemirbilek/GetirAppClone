import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Dimensions,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen"
import CategoryFilterScreen from "../screens/CategoryFilterScreen";
import { Entypo, Ionicons, Foundation,MaterialCommunityIcons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo";
import ProductDetailScreen from '../screens/ProductDetailScreen'
import { connect } from 'react-redux';
import { Product } from "../models";
import * as actions from '../redux/actions/cartAction'
const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');



function MyStack({ navigation, route,cartItems,clearCart }:{cartItems:Product[],clearCart: () => void}) {
  const tabHiddenRoutes = ['ProductDetails','CartScreen'];
  const [totalPrice,setTotalPrice] = useState<number>(0)
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log('Route Name is ', routeName);
    if (tabHiddenRoutes.includes(routeName)) {
      console.log('Kapat ', routeName);
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      console.log('Aç ', routeName);
      navigation.setOptions({ tabBarStyle: { display: 'true' } });
    }
  }, [navigation, route]); 


  const getProductsPrice = () => {
    var total=0
    cartItems.forEach(product => {
      const price = (total += product.product.fiyat)
      setTotalPrice(price)
    })
  } 

  useEffect(() => {
    getProductsPrice()

    return (() => {
      setTotalPrice(0)
    })

  },[navigation,route,cartItems])
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#5C3EBC' },
          headerTitle: () => (
            <Image
              source={require('../../assets/getirlogo.png')}
              style={{ width: 70, height: 30 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="CategoryDetails"
        component={CategoryFilterScreen}
        options={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#5C3EBC' },
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>
              Ürünler
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('CartScreen')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width * 0.2,
                height: 33,
                backgroundColor: 'white',
                marginRight: width * 0.03,
                borderRadius: 9,
              }}
            >
              <Image
                style={{ width: 23, height: 23, marginLeft: 6 }}
                source={require('../../assets/cart.png')}
              />
              <View
                style={{ height: 33, width: 2, backgroundColor: 'white' }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  height: 33,
                  borderTopRightRadius: 9,
                  backgroundColor: '#F3EFFE',
                  borderBottomRightRadius: 9,
                }}
              >
                <Text
                  style={{ color: '#5D3EBD', fontSize: 12, fontWeight: 'bold' }}
                >
                  <Text>{'\u20BA'}</Text>
                  {totalPrice}
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#5C3EBC' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 8 }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="close"
                size={26}
                color="white"
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>
              Ürün Detayı
            </Text>
          ),

          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }}>
              <Foundation
                style={{ marginRight: 8 }}
                name="heart"
                size={26}
                color="#32177a"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#5C3EBC' },
          headerTitle: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>
              Sepetim
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 8 }}
            >
              <Ionicons
                style={{ marginLeft: 4 }}
                name="close"
                size={26}
                color="white"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={()=> clearCart()}
            style={{ paddingRight: 10 }}>
              <Ionicons
                style={{ marginRight: 8 }}
                name="trash"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems:cartItems
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    clearCart:() => dispatch(actions.clearCart())
  }
}

function HomeNavigator({ navigation, route,cartItems,clearCart}:{cartItems:Product[],clearCart:() => void}) {
  return <MyStack navigation={navigation} route={route} cartItems={cartItems} clearCart={clearCart} />;
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeNavigator)