import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'


interface CustomData {
  id: number;
  name: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<CustomData[]>([
    { id: 1, name: 'Item Pertama' },
  ]);
  const [labelText, setLabelText] = useState(data[0].name);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeLabel = () => {
    setLabelText('Item Sudah Diubah');
  };

  const fetchPosts = async () => {
    const res = await axios.get('http://jsonplaceholder.typicode.com/posts');
    console.log(res.data);
    setPosts(res.data.slice(0, 10));
  };

  const deletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const deleteKeyFromPost = (key: keyof Post) => {
    setPosts((prev) =>
      prev.map(({ [key]: _, ...rest }) => ({ ...rest })) as Post[]
    );
  };

  const handleLogin = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

const hashString = async () => {
  const today = new Date();
  const date = `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getFullYear()}`;
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
  (async () => {
    await hashString();
  })();
  const storedUser = localStorage.getItem('username');
  if (storedUser) setLoggedIn(true);
}, []);


  return (
<div className="container">
{!loggedIn ? (
    <div>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="button green">Login</button>
    </div>
  ) : (
    <div>
      <p className="welcome">Selamat Datang, {localStorage.getItem('username')}</p>
      <button onClick={handleLogout} className="button gray">Logout</button>
    </div>
  )}
  <h2 className="label">Label: {labelText}</h2>
  <button onClick={changeLabel} className="button">Ubah Label</button>

  <hr />

  <h2 className="label">Data Post (Max 10)</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Body</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post) => (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.body}</td>
          <td>
            <button onClick={() => deletePost(post.id)} className="button red">
              Hapus
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button onClick={() => deleteKeyFromPost('body')} className="button yellow">
    Hapus Key 'body'
  </button>

  <hr />

  
</div>
  );
};

export default App;
