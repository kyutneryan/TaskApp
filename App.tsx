import React, { Suspense } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <GestureHandlerRootView style={styles.flex}>
              <SafeAreaProvider>
                <NavigationContainer>
                  <Text>Hello guys</Text>
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
