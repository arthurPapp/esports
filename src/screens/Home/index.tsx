import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useNavigation } from '@react-navigation/native';

// import { GAMES } from '../../utils/games';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}:GameCardProps) {
    navigation.navigate('game',{id, title, bannerUrl})
  }

  useEffect(() => {
    fetch(`http://172.22.112.1:8888/games`)
    .then(response => response.json())
    .then(data => setGames(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>

            <Image
                source={logoImg}
                style={styles.logo}
        />
        
        <Heading
          title="Encontre seu duo!"
          subtitle = "Selecione o game que deseja jogar..."
        />
        
        <FlatList 
          data={games}
          //importate ser texto
          keyExtractor={item => item.id}
          renderItem={({ item }) =>(
              <GameCard
              data={item}
                // vem da props TouchableOpacityProps, quando a função tem parametros tenho q usar ()=> 
               onPress={() => handleOpenGame(item)}
              />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
        
      
            
        </SafeAreaView>
      </Background>
  );
}