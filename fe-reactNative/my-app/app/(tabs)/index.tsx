import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  major: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body?: string;
}

const HomeScreen = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Rifqi', major: 'Informatika' },
    { id: 2, name: 'Alya', major: 'Sistem Informasi' },
  ]);
  const [labelText, setLabelText] = useState(students[0].name);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeLabel = () => {
    const nextIndex = (currentIndex + 1) % students.length;
    setLabelText(students[nextIndex].name);
    setCurrentIndex(nextIndex);
  };

  const fetchPosts = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(res.data.slice(0, 10));
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const deleteKeyFromPost = (key: keyof Post) => {
    setPosts(prev =>
      prev.map(({ [key]: _, ...rest }) => ({ ...rest })) as Post[]
    );
  };

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan Password wajib diisi.');
      return;
    }
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const hashString = async () => {
    const today = new Date();
    const date = `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${today.getFullYear()}`;
    const input = `${date}rifqipriaifabula`;

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log('Hash:', hashHex);
  };

  useEffect(() => {
    fetchPosts();
    hashString();
  }, []);

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selamat Datang, {username}</Text>
      <Button title="Logout" onPress={handleLogout} color="gray" />

      <View style={{ marginVertical: 20 }}>
        <Text style={styles.label}>Label: {labelText}</Text>
        <Button title="Ubah Label" onPress={changeLabel} />
      </View>

      <Text style={styles.header}>Data Post (Max 10)</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            {item.body && <Text>{item.body}</Text>}
            <Button title="Hapus" onPress={() => deletePost(item.id)} color="red" />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => deleteKeyFromPost('body')}
        style={[styles.button, { backgroundColor: 'orange' }]}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Hapus Key 'body'</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  postCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
});
