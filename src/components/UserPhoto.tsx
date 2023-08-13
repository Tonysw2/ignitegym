import { Box, Center, IImageProps, Icon, Image } from 'native-base'
import { Feather } from '@expo/vector-icons'

type Props = IImageProps & {
  size: number
  url: string | null
}

export function UserPhoto({ size, url, mr, ...rest }: Props) {
  return (
    <>
      {url ? (
        <Image
          h={size}
          w={size}
          rounded={'full'}
          borderWidth={2}
          borderColor={'gray.400'}
          source={{ uri: url }}
          {...rest}
        />
      ) : (
        <Box
          h={size}
          w={size}
          rounded={'full'}
          borderWidth={2}
          borderColor={'gray.400'}
          alignItems={'center'}
          justifyContent={'center'}
          mr={mr}
        >
          <Icon
            as={Feather}
            name="user"
            size={Math.floor(size / 2)}
            color={'gray.400'}
          />
        </Box>
      )}
    </>
  )
}
