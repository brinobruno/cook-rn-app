import { FlatList, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

import { services } from '@/services'
import { Recipe } from '@/components/Recipe'
import { styles } from './styles'
import { Ingredients } from '@/components/Ingredients'

export default function Recipes() {
  const params = useLocalSearchParams<{ ingredientsIds: string }>()
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [recipes, setRecipes] = useState<RecipeResponse[]>([])

  const ingredientsIds = params.ingredientsIds.split(',')

  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients)
  }, [ingredientsIds])

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes)
  }, [ingredientsIds])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.push('/')}
        />

        <Text style={styles.title}>Ingredients</Text>
      </View>

      <Ingredients ingredients={ingredients} />

      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item }) => (
          <Recipe
            recipe={{
              name: item.name,
              image: item.image,
              minutes: item.minutes,
            }}
          />
        )}
      />
    </View>
  )
}
