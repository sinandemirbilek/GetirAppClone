import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { Category } from '../../models'
import CategoryFiltering from '../../components/CategoryFiltering'
import TypeFiltering from "../../components/TypeFiltering"
import ProductItem from "../../components/ProductItem"
import Productscontainer from '../../components/ProductsContainer'

function index(props) {

  
  const [category,setCategory] = useState(props.route.params.category)

  return (
   <ScrollView>
    <CategoryFiltering category={category}/>
    <TypeFiltering/>
    <Productscontainer/>
   </ScrollView>
  )
}

export default index