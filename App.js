import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Homepage() {
  const [cookRand, setCookRand] = useState(null);
  const allIngredients = cookRand && cookRand.drinks
  ? Array.from({ length: 15 }, (_, index) => cookRand.drinks[0][`strIngredient${index + 1}`]).filter(Boolean)
  : [];


  function cooktailRand() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
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
    uri:
      'https://previews.123rf.com/images/yelenayemchuk/yelenayemchuk1704/yelenayemchuk170400393/77093691-mojito-de-cocktail-rafra%C3%AEchissant-menthe-citron-vert-avec-rhum-et-glace-en-verre-sur-fond-noir.jpg',
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
              <Text>{cookRand.drinks[0].strDrink}</Text>
            </View>
            <View style={styles.imageText}>
              <Image
                source={{ uri: cookRand.drinks[0].strDrinkThumb }}
                style={styles.image}
              />
              {/* changer pour avoir une liste plutot que des text */}
              <Text style={styles.desc}>
                Ingredient:{' '}
                {allIngredients.map((ingredient, index) => (
                  <Text key={index}>{ingredient}\n</Text>
                ))}
              </Text>
              {/* changer pour avoir une liste plutot que des text */}
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
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageText: {
    height: 200,
    width: 200,
  },

  image: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },

  desc: {

  },
});
