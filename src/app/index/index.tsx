import { Alert, ScrollView, Text, View } from 'react-native'

import { styles } from './styles'
import { useState } from 'react'
import { Ingredient } from '@/components/Ingredient'

import apple from './../../images/apple.png'
import { Selected } from '@/components/Selected'
import { router } from 'expo-router'

export default function Index() {
  const [selected, setSelected] = useState<string[]>([])

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
    router.navigate('/recipes')
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
        {Array.from({ length: 25 }).map((_item, index) => (
          <Ingredient
            key={index}
            title="Apple"
            image={apple}
            selected={selected.includes(String(index))}
            onPress={() => handleToggleSelected(String(index))}
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
