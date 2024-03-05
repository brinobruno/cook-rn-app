import { Image, Pressable, Text, PressableProps } from 'react-native'

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
      <Image source={{ uri: image }} alt={name} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  )
}
