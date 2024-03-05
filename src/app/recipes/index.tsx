import { FlatList, Text, View } from 'react-native'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles'
import { Recipe } from '@/components/Recipe'

export default function Recipes() {
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

      <FlatList
        data={['1']}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Recipe
            recipe={{
              name: 'Pizza',
              image:
                'https://blog.livup.com.br/wp-content/uploads/2021/06/pizza-napolitana.jpg',
              minutes: 60,
            }}
          />
        )}
      />
    </View>
  )
}
