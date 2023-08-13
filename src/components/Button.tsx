import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};

export function Button({ title, variant, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontSize="md"
        fontFamily="heading"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
