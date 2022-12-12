import './src/service/notificationConfigs';

import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import { getPusNotificationToken } from './src/service/gertPushNotificationToken';



//carregamento das fonts
export default function App() {

  const getNotFicatioListner = useRef<Subscription>();
  const responsetNotFicatioListner = useRef<Subscription>();

  useEffect(() => {
    getPusNotificationToken();
  });

  useEffect(() => {
    getNotFicatioListner.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responsetNotFicatioListner.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log(notification)
    });

    return () => {
      if (getNotFicatioListner.current && responsetNotFicatioListner.current) {
        Notifications.removeNotificationSubscription(getNotFicatioListner.current);
        Notifications.removeNotificationSubscription(responsetNotFicatioListner.current);
      }
    }
  }, []);
  
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
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}