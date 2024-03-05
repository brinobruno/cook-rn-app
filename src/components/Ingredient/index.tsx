import { Image, Pressable, Text, PressableProps } from 'react-native'

import { services } from '@/services'
import { styles } from './styles'

export interface IngredientsProps {
  name: string
  image: string
  selected?: boolean
}
export function Ingredient({
  name,
  image,
  selected = false,
  ...rest
}: IngredientsProps & PressableProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image
        source={{ uri: `${services.storage.imagePath}/${image}` }}
        alt={name}
        style={styles.image}
      />
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  )
}
