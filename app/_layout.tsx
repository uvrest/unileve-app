import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/theme/ThemeContext";

const StackScreens = () => {
  const { colors } = useTheme();
  const headerStyle = { backgroundColor: colors.background };
  const headerTintColor = colors.text;

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
  return (
    <ThemeProvider>
      <StackScreens />
    </ThemeProvider>
  );
}
