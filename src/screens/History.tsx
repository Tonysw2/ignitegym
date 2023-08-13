import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, VStack, SectionList, Text } from 'native-base'
import { useState } from 'react'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '27.08.22',
      data: ['Supino reto'],
    },
  ])

  return (
    <VStack>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color={'gray.200'}
            fontSize={'md'}
            fontFamily={'heading'}
            mt={10}
            mb={3}
          >
            {title}
          </Heading>
        )}
        px={8}
        ListEmptyComponent={() => (
          <Text
            color={'gray.100'}
            textAlign={'center'}
          >
            Não há treinos registrads ainda. {'\n'}
            Vamos fazer exercício hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}
