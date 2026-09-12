import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { TodoRow } from './TodoRow';
import { useTodos } from './useTodos';

export default function App() {
  const [title, setTitle] = useState('');
  const {
    todos,
    remainingCount,
    isHydrated,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const submitTodo = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    addTodo(trimmedTitle);
    setTitle('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>React Native implementation</Text>
            <Text style={styles.title}>Todo</Text>
            <Text style={styles.subtitle}>
              {remainingCount} remaining · {todos.length} total
            </Text>
          </View>

          <View style={styles.composer}>
            <TextInput
              accessibilityLabel="New todo title"
              onChangeText={setTitle}
              onSubmitEditing={submitTodo}
              placeholder="What needs to be done?"
              returnKeyType="done"
              style={styles.input}
              value={title}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add todo"
              disabled={!title.trim()}
              onPress={submitTodo}
              style={({ pressed }) => [
                styles.addButton,
                !title.trim() && styles.addButtonDisabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          {!isHydrated ? (
            <View style={styles.centered}>
              <ActivityIndicator />
              <Text style={styles.loadingText}>Loading local todos…</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={
                todos.length === 0 ? styles.emptyList : styles.list
              }
              data={todos}
              keyExtractor={todo => todo.id}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={styles.centered}>
                  <Text style={styles.emptyTitle}>Nothing left 🎉</Text>
                  <Text style={styles.emptyText}>Add a todo above to keep going.</Text>
                </View>
              }
              renderItem={({ item }) => (
                <TodoRow
                  todo={item}
                  onDelete={() => deleteTodo(item.id)}
                  onToggle={() => toggleTodo(item.id)}
                />
              )}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    gap: 4,
    paddingBottom: 20,
    paddingTop: 12,
  },
  eyebrow: {
    color: '#0369a1',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 16,
  },
  composer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    minHeight: 48,
    borderColor: '#cbd5e1',
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: 16,
    paddingHorizontal: 14,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#0284c7',
    minWidth: 72,
    paddingHorizontal: 16,
  },
  addButtonDisabled: {
    opacity: 0.45,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#64748b',
  },
  emptyTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 15,
  },
});
