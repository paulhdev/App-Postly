import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import Routes from './src/routes';

import AuthProvider from './src/contexts/AuthContext';
import Loading from './src/components/Loading';
import theme from './src/global/styles/theme';

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    <Loading />
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <StatusBar backgroundColor='#eb5e11' style='light' translucent={false} />
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
