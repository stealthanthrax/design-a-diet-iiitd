import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';

let saveButton = (clickFunction) => {
  return (
    <TouchableOpacity style={styles.button}  onPress={clickFunction} >
            <Text style={styles.text}>
                +
            </Text>
        </TouchableOpacity>
  )
}

let removeButton = (clickFunction) => {
  return (
    <TouchableOpacity style={styles.button2} onPress={clickFunction} >
      <Text style={styles.text}>
        -
      </Text>
    </TouchableOpacity>
  )
}



export default function RecommendedBox(props) {


  let image = props.imgSrc;
  if (image == '' || image== 'NF') {
    image = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Galbi-tang_ingredients.jpg';
  }


  return (
    <View style={styles.container} >
        <TouchableOpacity onPress={() => {
          props.recentFunction();
          props.navigateScreen();

        }}>

            <View style={styles.innerContainer} >
            
               <ImageBackground style={styles.image} source={{uri: image}}>
                {props.saveButton===true ? 
                saveButton(props.saveFunction) : (props.removeButton===true ? removeButton(props.removeFunction) : <Text />)  }   
               </ImageBackground>
              {/* {
                props.imgSrc ? (
                  <ImageBackground style={styles.image} source={{uri: props.imgSrc}} />

                  <ImageBackground/>
                ): (<></>)
              } */}


            </View>

            <View style={{marginTop: 10}} >
                <Text>{props.ingredientName?? "Ingredient"}</Text>
                <Text style={{fontSize: 12, fontWeight: "100"}}>{!props.quantity?'':props.quantity}</Text>
            </View>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F1F1',
      borderRadius: 10,
      display: 'flex',
      padding: 10,
      width: 160
    },
    innerContainer: {
        borderRadius: 8,
        backgroundColor: '#C4C4C4',
        height: 120,
        width: 140,
        padding: 10
    },
    button: {
      backgroundColor: "green",
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      alignSelf: 'flex-end',
    },
    button2: {
      backgroundColor: "red",
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      alignSelf: 'flex-end',
    },
    text: { 
      fontSize: 20,
      color: 'white'
     },
     image: {
       height: 100,
      resizeMode: 'contain'
     }
  });