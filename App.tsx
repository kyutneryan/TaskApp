import React from 'react';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './src/store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Text>Hello guys</Text>
      </QueryClientProvider>
    </Provider>
  );
}

// const styles = StyleSheet.create({ flex: { flex: 1 } });

export default App;
