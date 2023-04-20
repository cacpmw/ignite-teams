import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./styles";


interface FilterComponentProps extends TouchableOpacityProps, FilterStyleProps {
    title: string;

}
export function Filter({ title, isActive = false, ...rest }: FilterComponentProps) {

    return (
        <Container
            isActive={isActive}
            {...rest}
        >
            <Title>{title}</Title>
        </Container>
    )
}