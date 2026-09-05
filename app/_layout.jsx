import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';

import { colors } from './theme/colors';
import { initializeDatabase } from '../db/database';

export default function OnboardingLayout() {
  return (
    <SQLiteProvider
      databaseName="forkcast_test.db"
      onInit={initializeDatabase}
    >
      <View style={styles.background}>

        <View style={styles.pageFrame}>

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: colors.white,
              },
            }}
          />

        </View>

      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },

  pageFrame: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 20,
    borderColor: colors.sage,
    borderRadius: 20,
    overflow: 'hidden',
  },

});