import {
  Image,
  ImageProps,
  Pressable,
  Text,
  PressableProps,
} from 'react-native'

import { styles } from './styles'

interface IngredientsProps {
  text: string
  image: ImageProps
  selected?: boolean
}
export function Ingredient({
  text,
  image,
  selected = false,
  ...rest
}: IngredientsProps & PressableProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image source={image} alt={text} style={styles.image} />
      <Text style={styles.title}>{text}</Text>
    </Pressable>
  )
}
