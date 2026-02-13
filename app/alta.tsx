import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput,Checkbox  } from 'react-native-paper';
import api from '../src/services/api';

export default function AltaEmpresa() {
  // Estado para el formulario basado en tu JSON de la API
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    fechaCreacion: '',
    activa: true,
    facturacion: '',
    porcentajeEnBolsa: ''
  });

  const [loading, setLoading] = useState(false);

  // Helper para mostrar alert con fallback en web
  const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
      // window.alert funciona en la web (Expo web)
      window.alert(title + (message ? '\n\n' + message : ''));
    } else {
      Alert.alert(title, message);
    }
  };

  // Función para enviar los datos
  const handleSave = async () => {
    console.log('[AltaEmpresa] handleSave called — form:', form);
    // Validación simple
    if (!form.nombre || !form.fechaCreacion) {
      showAlert('Error', 'Por favor, rellena al menos el nombre y la fecha.');
      return;
    }

    setLoading(true);
    try {
      // Usamos el endpoint para el alta
      await api.post('/empresas', form);
      
      showAlert('Éxito', 'Empresa guardada correctamente');
      
      // Limpiar formulario tras éxito
      setForm({ 
        nombre: '',
        descripcion: '',
        fechaCreacion: '',
        activa: true,
        facturacion: '',
        porcentajeEnBolsa: ''
       });
    } catch (error: any) {
      // El interceptor que creamos antes manejará el log,
      // aquí mostramos el error en consola y al usuario.
      console.error('[AltaEmpresa] save error:', error);
      showAlert('Error', error?.mensaje || 'No se pudo guardar la empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Nueva Empresa</Text>
      
      <TextInput
        label="Nombre de la empresa"
        value={form.nombre}
        onChangeText={(text) => setForm({ ...form, nombre: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: Pilla Diamante"
      />

      <TextInput
        label="Fecha de creacion (AAAA-MM-DD)"
        value={form.fechaCreacion}
        onChangeText={(text) => setForm({ ...form, fechaCreacion: text })}
        mode="outlined"
        style={styles.input}
        placeholder="1880-12-12"
      />

      <TextInput
        label="Descripcion"
        value={form.descripcion}
        onChangeText={(text) => setForm({ ...form, descripcion: text })}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <TextInput
        label="Facturacion de la empresa"
        value={form.facturacion}
        onChangeText={(text) => setForm({ ...form, facturacion: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: 435876"
      />

      <TextInput
        label="Porcentage en la bolsa"
        value={form.porcentajeEnBolsa}
        onChangeText={(text) => setForm({ ...form, porcentajeEnBolsa: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: 49,9"
      />
      
      <Text variant="labelLarge" style={styles.title}>¿Esta activa?</Text>
      <Checkbox
        status={form.activa?"checked" : "unchecked"}
        onPress={() => setForm({ ...form, activa: !form.activa })}
      />

      <Button 
        mode="contained" 
        onPress={handleSave} 
        loading={loading}
        disabled={loading}
        icon="content-save"
        style={styles.button}
      >
        Guardar Empresa
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});