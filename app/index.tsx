import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Página Principal</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>Gestión de empresas</Text>
      <Button mode="contained" onPress={() => router.push('/listado')}>
        Ver Listado
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  subtitle: { marginBottom: 20, color: 'gray' }
});