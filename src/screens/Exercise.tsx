import {
  VStack,
  Icon,
  HStack,
  Heading,
  Text,
  Image,
  Box,
  ScrollView,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack
        px={8}
        bg={'gray.600'}
        pt={12}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color={'green.500'}
            size={6}
          />
        </TouchableOpacity>

        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          mt={4}
          mb={8}
        >
          <Heading
            color={'gray.100'}
            fontSize={'lg'}
            fontFamily={'heading'}
            flexShrink={1}
          >
            Puxada frontal
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />

            <Text
              color={'gray.200'}
              ml={1}
              textTransform={'capitalize'}
            >
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w={'full'}
            h={80}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1Ezv6SUqaLWJCLH02Ud_lJoEOlUcaGwFfA&usqp=CAU',
            }}
            alt="Nome do exercício"
            resizeMode="cover"
            rounded={'lg'}
            overflow={'hidden'}
            mb={3}
          />

          <Box
            bg={'gray.600'}
            rounded={'lg'}
            p={5}
          >
            <HStack
              alignItems={'center'}
              justifyContent={'space-around'}
              mb={6}
            >
              <HStack alignItems={'center'}>
                <SeriesSvg />

                <Text
                  color={'gray.200'}
                  ml={2}
                >
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems={'center'}>
                <RepetitionSvg />

                <Text
                  color={'gray.200'}
                  ml={2}
                >
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
