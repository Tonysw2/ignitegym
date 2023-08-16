import { HistoryDTO } from '@dtos/HistoryDTO'
import { HStack, Heading, Text, VStack } from 'native-base'

type HistoryCardProps = {
  data: HistoryDTO
}

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack
      w={'full'}
      py={4}
      px={5}
      mb={3}
      bg={'gray.600'}
      rounded={'md'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack>
        <Heading
          color={'white'}
          fontSize={'md'}
          fontFamily={'heading'}
          textTransform={'capitalize'}
          numberOfLines={1}
          flex={1}
        >
          {data.group}
        </Heading>

        <Text
          color={'gray.100'}
          fontSize={'lg'}
          numberOfLines={1}
          flex={1}
        >
          {data.name}
        </Text>
      </VStack>

      <Text
        color={'gray.300'}
        fontSize={'sm'}
      >
        {data.hour}
      </Text>
    </HStack>
  )
}
