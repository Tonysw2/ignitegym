import {
  VStack,
  Icon,
  HStack,
  Heading,
  Text,
  Image,
  Box,
  ScrollView,
  useToast,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute } from '@react-navigation/native'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { useEffect, useState } from 'react'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

type RouteParams = {
  exerciseId: string
}

export function Exercise() {
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.700',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseHistorySubmit() {
    try {
      setIsSubmittingRegister(true)

      await api.post('/history', { exercise_id: exerciseId })

      toast.show({
        title: 'Parabéns! exercício registrado no seu histórico.',
        placement: 'top',
        bgColor: 'green.700',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.700',
      })
    } finally {
      setIsSubmittingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

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
            {exercise.name}
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />

            <Text
              color={'gray.200'}
              ml={1}
              textTransform={'capitalize'}
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {!isLoading ? (
        <ScrollView>
          <VStack p={8}>
            <Box
              overflow={'hidden'}
              rounded={'lg'}
              mb={3}
            >
              <Image
                w={'full'}
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
                rounded={'lg'}
                overflow={'hidden'}
              />
            </Box>

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

              <Button
                title="Marcar como realizado"
                onPress={handleExerciseHistorySubmit}
                isLoading={isSubmittingRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </VStack>
  )
}
