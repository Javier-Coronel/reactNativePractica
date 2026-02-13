import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Text } from "react-native-paper";
import { EmpresaCard } from "../src/components/EmpresaCard";
import api from "../src/services/api";

export default function Listado() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Helper para mostrar mensajes (Multiplataforma)
  const showSimpleAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // 2. Función para obtener empresas (GET)
  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const data = await api.get("/empresas");
      // Recordatorio: nuestro interceptor ya devuelve el .data de axios
      setEmpresas(data.datos);
    } catch (error: any) {
      showSimpleAlert(
        "Error",
        error.mensaje || "No se pudieron cargar los datos",
      );
    } finally {
      setLoading(false);
    }
  };

  // 3. Refrescar datos cuando la pantalla gana el foco
  //   Con useFocusEffect, la función fetchEmpresas() se ejecuta
  //   cada vez que el usuario entra en la pestaña.
  //   lleva un useCallback dentro para evitar bucles infinitos.
  //   useCallback memoriza la función
  useFocusEffect(
    useCallback(() => {
      fetchEmpresas();
    }, []),
  );

  // 4. Lógica de borrado (Multiplataforma)
  const handleDelete = (id: number) => {
    const title = "Eliminar";
    const msg = "¿Estás seguro de que quieres eliminar este empresa?";

    if (Platform.OS === "web") {
      if (window.confirm(`${title}\n\n${msg}`)) {
        ejecutarBorrado(id);
      }
    } else {
      Alert.alert(title, msg, [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => ejecutarBorrado(id),
          style: "destructive",
        },
      ]);
    }
  };

  const ejecutarBorrado = async (id: number) => {
    try {
      await api.delete(`/empresas/${id}`);
      showSimpleAlert("Éxito", "Empresa eliminado");
      fetchEmpresas(); // Recargar la lista tras borrar
    } catch (error: any) {
      showSimpleAlert("Error", "No se pudo eliminar el registro");
    }
  };

  // 5. Renderizado
  if (loading && empresas.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} color="#6200ee" size="large" />
        <Text style={{ marginTop: 10 }}>Cargando empresas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={empresas}
        keyExtractor={(item: any) => item.id_empresa.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EmpresaCard
            id_empresa={item.id_empresa}
            nombre={item.nombre}
            descripcion={item.descripcion}
            fechaCreacion={item.fechaCreacion}
            activa={item.activa}
            facturacion={item.facturacion}
            porcentajeEnBolsa={item.porcentajeEnBolsa}
            onDelete={() => handleDelete(item.id_empresa)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text variant="bodyLarge">No hay empresas disponibles</Text>
          </View>
        }
      />

      {/* Botón flotante para refrescar manualmente */}
      <FAB
        icon="refresh"
        style={styles.fab}
        onPress={fetchEmpresas}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Espacio para que el FAB no tape la última card
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
});
