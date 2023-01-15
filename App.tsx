import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/routes';

import AuthProvider from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#eb5e11' style='light' translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
