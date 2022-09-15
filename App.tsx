import { StatusBar } from 'react-native';
//carregamento das fonts
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';

export default function App() {
  //carregar as fonts no app
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });


  return (
    <Background>
      <StatusBar barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* para fazer loading enquanto as fontes não são carregadas */}
      {fontsLoaded ? <Home /> : <Loading />}
    </Background>
  );
}