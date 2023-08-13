import { HStack, Heading, Text, VStack } from 'native-base'

export function HistoryCard() {
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
          Costas
        </Heading>

        <Text
          color={'gray.100'}
          fontSize={'lg'}
          numberOfLines={1}
          flex={1}
        >
          Puxada frontal
        </Text>
      </VStack>

      <Text
        color={'gray.300'}
        fontSize={'sm'}
      >
        12:00
      </Text>
    </HStack>
  )
}
