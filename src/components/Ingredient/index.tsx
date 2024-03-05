import {
  Image,
  ImageProps,
  Pressable,
  Text,
  PressableProps,
} from 'react-native'

import { styles } from './styles'

export interface IngredientsProps {
  title: string
  image: ImageProps
  selected?: boolean
}
export function Ingredient({
  title,
  image,
  selected = false,
  ...rest
}: IngredientsProps & PressableProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image source={image} alt={title} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}
