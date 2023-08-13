import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { HStack, VStack, FlatList, Heading, Text } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [exercises, setExercises] = useState([
    'Agachamento',
    'Elevação de quedril',
    'Stiff',
    'Leg press',
    'Agachamento búlgaro',
  ])
  const [groups, setGroups] = useState([
    'costas',
    'ombro',
    'peito',
    'braço',
    'perna',
  ])
  const [groupSelected, setGroupSelected] = useState('costas')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard
              name={item}
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  )
}
