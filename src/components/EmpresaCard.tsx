import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Avatar, IconButton, Button } from 'react-native-paper';

interface EmpresaProps {

  id_empresa: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  activa: boolean;
  facturacion: number;
  porcentajeEnBolsa: number;
  onDelete: (id: number) => void;
}

export function EmpresaCard({ 
  id_empresa, 
  nombre,
  descripcion,
  fechaCreacion,
  activa,
  facturacion,
  porcentajeEnBolsa, 
  onDelete }: EmpresaProps) {
  return (
    <Card style={styles.card} mode="elevated">
      {/* Cabecera con Avatar e Icono de Borrado */}
      <Card.Title
        title={nombre}
        titleVariant="titleLarge"
        subtitle={`Empresa - desde ${fechaCreacion}`}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete-outline"
            iconColor="#B00020"
            onPress={() => onDelete(id_empresa)}
          />
        )}
      />

      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          {descripcion || "No hay descripcion disponible."}
        </Text>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          {` - Facturacion de la empresa: ${facturacion}`}
        </Text>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          {` - Porcentage en la bolsa: ${porcentajeEnBolsa}`}
        </Text>
        <Text variant="bodySmall">
          {activa?" - Esta activa":" - No esta activa"}
        </Text>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 8,
  },
  bio: {
    color: '#444',
    lineHeight: 20,
  }
});