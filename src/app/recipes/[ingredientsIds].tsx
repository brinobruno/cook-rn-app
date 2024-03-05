import { FlatList, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'

import { services } from '@/services'
import { Recipe } from '@/components/Recipe'
import { Ingredients } from '@/components/Ingredients'
import { Loading } from '@/components/Loading'
import { styles } from './styles'

export function EmptyList() {
  return (
    <Text style={styles.empty}>
      No recipes were found. Choose other ingredients.
    </Text>
  )
}

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true)
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [recipes, setRecipes] = useState<RecipeResponse[]>([])

  const params = useLocalSearchParams<{ ingredientsIds: string }>()
  const ingredientsIds = params.ingredientsIds.split(',')

  useEffect(() => {
    services.recipes
      .findByIngredientsIds(ingredientsIds)
      .then((response) => setRecipes(response))
      .finally(() => setIsLoading(false))
  }, [ingredientsIds])

  useEffect(() => {
    services.ingredients
      .findByIds(ingredientsIds)
      .then((response) => setIngredients(response))
      .finally(() => setIsLoading(false))
  }, [ingredientsIds])

  if (isLoading) return <Loading />

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
            recipe={item}
            onPress={() => router.navigate(`/recipe/${item.id}`)}
          />
        )}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  )
}
