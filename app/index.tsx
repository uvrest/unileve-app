import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/unileve-logo-light.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo à Unileve</Text>
      <Text style={styles.description}>
        Estamos felizes em vê-lo aqui. Este aplicativo vai facilitar a interação com nossas máquinas via QR Code.
      </Text>
      <Text style={styles.description}>
        Para começar, basta seguir as instruções e escanear o código na máquina desejada.
      </Text>
      <Text style={styles.instruction}>
        Pressione o botão abaixo para scanear o QRCode de uma máquina Unileve
      </Text>
      <Link href={'/qrscanner'} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Abrir Scanner QR</Text>
        </Pressable>
      </Link>
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
