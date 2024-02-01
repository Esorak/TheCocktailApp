import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Homepage() {
  const [cookRand, setCookRand] = useState(null);
  const allIngredients = cookRand && cookRand.drinks
    ? Array.from({ length: 15 }, (_, index) => cookRand.drinks[0][`strIngredient${index + 1}`]).filter(Boolean)
    : [];

  function cooktailRand() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((resp) => resp.json())
      .then((cookRand) => {
        setCookRand(cookRand);
        console.log(cookRand);
      })
      .catch(() => {
        console.log('Error fetching cocktail data');
      });
  }

  useEffect(() => {
    cooktailRand();
  }, []);

  const image = {
    uri: 'https://static.vecteezy.com/ti/photos-gratuite/p2/16655414-degrade-de-vert-et-de-jaune-gratuit-photo.jpg',
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={10}
        source={image}
        resizeMode="cover"
        style={styles.image}
      >
        {cookRand && cookRand.drinks && (
          <View style={styles.infBlock}>
            <View style={styles.name}>
              <Text style={styles.drinkName}>{cookRand.drinks[0].strDrink}</Text>
            </View>
            <View style={styles.imageText}>
              <Image
                source={{ uri: cookRand.drinks[0].strDrinkThumb }}
                style={styles.image}
              />
              {/* Changed to use a flat list for better structure */}
              <Text style={styles.desc}>
                Ingredients:{'\n'}
                {allIngredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredient}>
                    {ingredient}
                    {'\n'}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
        )}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    marginBottom: 20,
  },

  drinkName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  imageText: {
    height: 500,
    width: 250,
    alignItems: 'center',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  desc: {
    textAlign: 'center',
    color: 'black',
    marginTop: 20,
  },

  ingredient: {
    color: 'black',
  },
});
