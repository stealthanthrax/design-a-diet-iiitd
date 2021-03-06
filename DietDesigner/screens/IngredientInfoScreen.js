import React from 'react';
import { StyleSheet, StatusBar, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import IngredientName from '../components/IngredientInfoScreenComponents/IngredientName';
import IngredientImage from '../components/IngredientInfoScreenComponents/IngredientImage';
import Quantity from '../components/IngredientInfoScreenComponents/Quantity';
import Info from '../components/IngredientInfoScreenComponents/Info';
import ButtonArea from '../components/IngredientInfoScreenComponents/ButtonArea'
import {storeData} from '../api/AsyncStorage';

export default function IngredientInfoScreen({navigation, route}) {

  const [quantity, useQuantity] = useState(100);
  
  const CartAdder = () => {
    let name = route.params.ingredientName;
    let calories = route.params.calories;
    let carbohydrates = route.params.carbohydrates;
    let proteins = route.params.proteins;
    let fats = route.params.fats;
    let nutrients = route.params.nutrients;
    let imagelink = route.params.image;
    let quant = quantity;
    storeData('cart2', {name, calories, proteins, carbohydrates, fats, nutrients, imagelink, quant});
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="skyblue" barStyle="light-content"/>
      <IngredientName name={route.params.ingredientName}/>
      <IngredientImage image={route.params.image}/>
      <Quantity onQuantityChange={(quantity) => useQuantity(quantity)}/>
      <Info quantity={quantity} carbohydrates={route.params.carbohydrates} proteins={route.params.proteins} fats={route.params.fats} calories={route.params.calories}/>
  
      <ButtonArea quantity={quantity} saveFunction={() => CartAdder()} navigation={navigation} nutrients={route.params.nutrients} name={route.params.ingredientName}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  
});
