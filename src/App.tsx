import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "./global/styles";
import { AuthProvider, LocationProvider } from "./global/hooks";
// import Routes from "./routes";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [fontsLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (fontsLoaded && !error) {
    SplashScreen.hideAsync();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={colors.transparent}
              translucent={false}
            />
            {/* <Routes /> */}
            <Toast />
          </GestureHandlerRootView>
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
