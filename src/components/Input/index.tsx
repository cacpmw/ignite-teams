import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components";

interface InputComponentProps extends TextInputProps{
    inputRef?: React.RefObject<TextInput>;
}

export default function Input({ inputRef, ...rest }: InputComponentProps) {
    const { COLORS } = useTheme();
    return (
        <Container
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
            {...rest} />

    )
}