import { Container, Title } from './styles';
import {StyleSheet, View, Text} from "react-native";


export default function Groups() {
  return (
    
    <Container>
      <Title style={styles.text}>Groups</Title>
    </Container>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent:"center"
  },
  text:{
    color:"#FFF",
    fontSize: 12
  }
});
{/* <Container>
      <Title>Groups</Title>
    </Container> */}