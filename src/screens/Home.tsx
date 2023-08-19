import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import {
  HStack,
  VStack,
  FlatList,
  Heading,
  Text,
  useToast,
  Skeleton,
} from 'native-base'
import { useCallback, useEffect, useState } from 'react'

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.700',
      })
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.700',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      {!isLoading ? (
        <>
          <FlatList
            data={groups}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <Group
                name={item.toUpperCase()}
                isActive={groupSelected === item}
                onPress={() => setGroupSelected(item)}
                mr={index === groups.length - 1 ? 0 : 3}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            _contentContainerStyle={{ px: 8 }}
            my={10}
            minH={10}
            maxH={10}
            h={10}
          />

          <VStack
            flex={1}
            px={8}
          >
            <HStack
              justifyContent={'space-between'}
              mb={5}
            >
              <Heading
                color={'gray.200'}
                fontSize={'md'}
                fontFamily={'heading'}
              >
                Exercícios
              </Heading>
              <Text
                color={'gray.200'}
                fontSize={'sm'}
              >
                {exercises.length}
              </Text>
            </HStack>

            <FlatList
              data={exercises}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ExerciseCard
                  data={item}
                  onPress={() => handleOpenExerciseDetails(item.id)}
                />
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ pb: 20 }}
            />
          </VStack>
        </>
      ) : (
        <>
          <HStack
            space={3}
            my={10}
            px={8}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                h={10}
                w={24}
                rounded={'md'}
                startColor={'gray.500'}
                endColor={'gray.400'}
              />
            ))}
          </HStack>

          <VStack
            flex={1}
            px={8}
          >
            <HStack
              mb={5}
              justifyContent={'space-between'}
            >
              <Skeleton
                h={7}
                rounded={'md'}
                flex={0.85}
                startColor={'gray.500'}
                endColor={'gray.400'}
              />
              <Skeleton
                h={7}
                rounded={'md'}
                flex={0.1}
                startColor={'gray.500'}
                endColor={'gray.400'}
              />
            </HStack>

            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                h={20}
                rounded={'md'}
                mb={3}
                startColor={'gray.500'}
                endColor={'gray.400'}
              />
            ))}
          </VStack>
        </>
      )}
    </VStack>
  )
}
