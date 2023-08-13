import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  name: string
}

export function ExerciseCard({ name, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={'gray.500'}
        alignItems={'center'}
        p={2}
        pr={4}
        rounded={'md'}
        mb={3}
      >
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1Ezv6SUqaLWJCLH02Ud_lJoEOlUcaGwFfA&usqp=CAU',
          }}
          alt="Imagem do exercícios"
          h={16}
          w={16}
          rounded={'md'}
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading
            color={'gray.100'}
            fontSize={'lg'}
            fontFamily={'heading'}
          >
            {name}
          </Heading>
          <Text
            color={'gray.200'}
            fontSize={'sm'}
            mt={1}
            numberOfLines={2}
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color={'gray.300'}
          size={5}
        />
      </HStack>
    </TouchableOpacity>
  )
}
