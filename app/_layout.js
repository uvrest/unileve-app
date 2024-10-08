import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { Colors } from "@/constants/Colors";

// Tema claro personalizado
const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...Colors.light,
  },
};

// Tema escuro personalizado
const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...Colors.dark,
  },
};

const StackScreens = () => {
  
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

  const headerStyle = { backgroundColor: theme.colors.primary };
  const headerTintColor = theme.colors.onPrimary;

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
          headerTitle: 'Checkout e Pagamento',
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
  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <PaperProvider theme={theme}>
        <StackScreens />
    </PaperProvider>
  );
}
