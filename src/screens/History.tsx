import { HistoryCard } from '@components/HistoryCard'
import { Loading } from '@components/Loading'
import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Heading, VStack, SectionList, Text, useToast } from 'native-base'
import { useCallback, useState } from 'react'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const { data } = await api.get('/history')
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível obter o histórico. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {!isLoading ? (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
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
              Não há treinos registrados ainda. {'\n'}
              Vamos fazer exercício hoje?
            </Text>
          )}
          contentContainerStyle={
            exercises.length === 0 && {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Loading />
      )}
    </VStack>
  )
}
