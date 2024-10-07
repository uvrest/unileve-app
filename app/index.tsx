import { Pressable, View, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Index() {

  return (
    <View style={styles.container}>

      <Image source={require('@/assets/images/unileve-logo-light.png')} style={styles.logo} />

      <Card style={{ width: '100%' }}>
        {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
        <Card.Title title="Bem-vindo à Unileve" subtitle="Estamos felizes em vê-lo aqui" />
        <Card.Content>
          <Text variant="titleLarge">Para começar, clique no botão abaixo para escanear o código na máquina desejada.</Text>
          <Text variant="bodyMedium">* Nosso app está em fase alpha</Text>
        </Card.Content>
        <Card.Actions>
          <Link href={'/qrscanner'} asChild>
            <Button icon="camera" mode="contained">
              Abrir Scanner QR
            </Button>
          </Link>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 53,
    paddingBottom: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  instruction: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#0AB8B6',
    padding: 15,
    borderRadius: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
