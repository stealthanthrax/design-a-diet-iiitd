import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';


export default function Button1() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
                See Full Nutritional Composition
            </Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#23313d',
    alignSelf: 'center',
    marginHorizontal: 14,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    width: 320,
    padding: 10,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: '#F4F1F1',
    textAlign: 'center',
  }


  
});