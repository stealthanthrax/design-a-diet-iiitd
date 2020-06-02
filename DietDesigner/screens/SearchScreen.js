import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import RecommendedBox from '../components/RecommendedBox';
import RecentIngredientList from '../components/RecentIngredientList';
import { ScrollView } from 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import ButtonArea from '../components/SearchComponents/ButtonArea'
import {retrieveData, clearData, storeData} from '../api/AsyncStorage';


export default function SearchScreen({navigation}) {

    const [savedItems, useSavedItems] = useState([]);
    const [recentItems, useRecentItems] = useState([]);
    useEffect(()=>{
        (async () => {
            const asyncSavedItems = await retrieveData('cart');
            // const asyncRecentItems = await retrieveData('recent');
            useSavedItems([...asyncSavedItems]);
            //2 statements slowing down dapp
            // console.log(asyncSavedItems);
            // useRecentItems([...asyncRecentItems]);
            clearData('recent');
        })()
    })

    const navigateScreen = (name, calories, carbohydrates, proteins, fats, nutrients) => {
        navigation.navigate('IngredientInfoScreen', {ingredientName: name??'',calories: calories, carbohydrates: carbohydrates??100, proteins: proteins??50, fats: fats??20, nutrients:nutrients});
      }

    return (
        <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <View style={{ borderWidth: 1, flexDirection: 'row'}}>
                <Ionicons name="ios-search" size={25}/>
                 { <ButtonArea navigation={navigation}/> }
                
            </View>


            <View style={{paddingTop: 10, flex: 2}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                    <TouchableOpacity><Text style={[styles.textStyle, styles.textBold]}>Recent</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={[styles.textStyle,styles.textMuted]}>View All</Text></TouchableOpacity>
                </View>
                <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 10 }}>
                    {/* <TouchableOpacity onPress={()=>navigateScreen("Potato", 200, 100, 50)}>                    
                        <RecentIngredientList ingredient="Potato"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigateScreen("Orange", 150, 30, 27)}>                    
                        <RecentIngredientList ingredient="Orange"/>
                    </TouchableOpacity> */}
                    {recentItems.map((item, index) => {
                        let {name, calories, proteins, carbohydrates, fats, nutrients} = item;
                        return (
                            <TouchableOpacity onPress={()=>navigateScreen(name, calories, carbohydrates, proteins, fats, nutrients)}>                    
                                <RecentIngredientList ingredient={item.name.split(' ').slice(-2).join(' ').toUpperCase()}/>
                            </TouchableOpacity>
                        )
                    })}
                    
                </View>
                
            </View>


            <View style={{flex:3}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                    <TouchableOpacity><Text style={[styles.textStyle, styles.textBold]}>Saved</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{clearData('cart')}}><Text style={[styles.textStyle,styles.textMuted]}>Clear All</Text></TouchableOpacity>
                </View>

                <View style={{paddingTop: 20, flex: 1}}>
                    <ScrollView  horizontal={true}>
                        {
                        savedItems.map((item, index)=> {
                            let {name, calories, proteins, carbohydrates, fat, nutrients} = item;
                            return (
                            <View key={index} style={{marginLeft:10}}> 
                                <RecommendedBox recentFunction = {() => {storeData('recent', {name, calories, proteins, carbohydrates, fat, nutrients})}} navigateScreen={()=>navigateScreen(name, calories, carbohydrates.toFixed(2), proteins, fat.toFixed(2), nutrients)} ingredientName={item.name.split(' ').slice(-2).join(' ').toUpperCase()}  style={styles.scrollHorizontal} /> 
                                <View style={{paddingHorizontal: 10}}>
                                <Text style={styles.recommendedText}>Calories: {item.calories}</Text> 
                                <Text style={styles.recommendedText}>Proteins: {item.proteins??0}</Text> 
                                <Text style={styles.recommendedText}>Carbs: {item.carbohydrates}</Text> 
                                <Text style={styles.recommendedText}>Fats: {item.fat??0}</Text> 
                                </View>
                                
                            </View>
                            )
                            
                        })
                        }
                        
                    </ScrollView>
                </View>
                <View style={{height: 20}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        
    },
    textMuted: {
    fontWeight: '100'
    },
    textBold: {
    fontWeight: 'bold'
    },
    recommendedText: {
        fontSize: 10,
        fontWeight: 'bold',
      }
})
