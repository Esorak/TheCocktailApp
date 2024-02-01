import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Homepage() {
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((resp) => resp.json())
      .then((cookRand) => {
        setRecipeData((prevData) => [...prevData, cookRand.drinks[0]]);
        setIsLoading(false);
      })
      .catch(() => {
        console.log('Error fetching cocktail data');
        setIsLoading(false);
      });
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity onPress={() => console.log('Recipe selected:', item.strDrink)}>
      <View style={styles.recipeItem}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={styles.image}
        />
        <Text style={styles.drinkName}>{item.strDrink}</Text>
        <Text style={styles.desc}>
          Ingredients:{'\n'}
          {Array.from({ length: 15 }, (_, index) => item[`strIngredient${index + 1}`]).filter(Boolean).map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              {ingredient}
              {'\n'}
            </Text>
          ))}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleEndReached = () => {
    if (!isLoading) {
      setIsLoading(true);
      loadRecipes();
    }
  };

  return (
    <ImageBackground
      blurRadius={10}
      source={{ uri: 'https://static.vecteezy.com/ti/photos-gratuite/p2/16655414-degrade-de-vert-et-de-jaune-gratuit-photo.jpg' }}
      resizeMode="cover"
      style={styles.container}
    >
      <FlatList
        data={recipeData}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderRecipeItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  recipeItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },

  drinkName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },

  image: {
    width: windowWidth - 20,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  desc: {
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },

  ingredient: {
    color: 'black',
  },
});
