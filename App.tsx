import React, { Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from './src/navigation/AppNavigation';
import { persistor, store } from './src/store';
import { COLORS } from './src/utils/constants';

const queryClient = new QueryClient();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
  },
};

function App(): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <GestureHandlerRootView style={styles.flex}>
              <SafeAreaProvider>
                <NavigationContainer theme={navTheme}>
                  <AppNavigation />
                </NavigationContainer>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });

export default App;
