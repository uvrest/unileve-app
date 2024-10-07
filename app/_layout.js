import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { Colors } from "@/constants/Colors";

const StackScreens = () => {
  
  const headerStyle = { backgroundColor: '#31ceca' };
  const headerTintColor = '#11181C';

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          headerShown: true,
          headerStyle: headerStyle,
          headerTintColor: headerTintColor,
        }}
      />
      <Stack.Screen
        name="qrscanner"
        options={{
          headerTitle: 'Scaneie uma máquina Unileve',
          headerShown: true,
          headerStyle: headerStyle,
          headerTintColor: headerTintColor,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          headerTitle: 'Informações de pagamento',
          headerShown: true,
          headerStyle: headerStyle,
          headerTintColor: headerTintColor,
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerTitle: 'Checkout do pedido',
          headerShown: true,
          headerStyle: headerStyle,
          headerTintColor: headerTintColor,
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const paperTheme = 
    colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: Colors.dark}
    : { ...MD3LightTheme, colors: Colors.light}


  return (
    <PaperProvider theme={paperTheme}>
        <StackScreens />
    </PaperProvider>
  );
}
