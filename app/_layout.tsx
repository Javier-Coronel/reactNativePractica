import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#6200ee',
        headerTitleAlign: 'center' 
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="alta"
          options={{
            title: 'Alta Director',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-plus" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="listado"
          options={{
            title: 'Listado',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-bulleted" size={28} color={color} />,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}