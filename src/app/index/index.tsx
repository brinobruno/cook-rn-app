import { Alert, ScrollView, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'

import { services } from '@/services'
import { Ingredient } from '@/components/Ingredient'
import { Selected } from '@/components/Selected'
import { Loading } from '@/components/Loading'
import { styles } from './styles'

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

  useEffect(() => {
    services.ingredients
      .findAll()
      .then(setIngredients)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loading />

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value))
    }

    setSelected((state) => [...state, value])
  }

  function handleClearSelected() {
    Alert.alert('Cleanup', 'Do you want to clear everything?', [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => setSelected([]) },
    ])
  }

  function handleSearch() {
    router.navigate(`/recipes/${selected}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Choose {'\n'}
        <Text style={styles.subtitle}>the products</Text>
      </Text>
      <Text style={styles.message}>
        Find recipes based on the products you chose.
      </Text>

      <ScrollView
        contentContainerStyle={styles.ingredients}
        showsVerticalScrollIndicator={false}
      >
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            name={ingredient.name}
            image={ingredient.image}
            selected={selected.includes(ingredient.id)}
            onPress={() => handleToggleSelected(ingredient.id)}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  )
}
