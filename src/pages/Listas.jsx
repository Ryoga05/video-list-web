import React, { useEffect, useState } from 'react';
import { FIREBASE_STORAGE, auth } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Menu from '../components/Menu';
import AddButton from '../components/AddButton';
import ListComponent from '../components/ListComponent';
import AddList from '../components/AddList';
import { useNavigate } from 'react-router-dom';

export default function Listas() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userEmail = auth.currentUser.email;
        const querySnapshot = await getDocs(
          collection(FIREBASE_STORAGE, 'users', userEmail, 'listas')
        );
        const loadedLists = [];
        querySnapshot.forEach((doc) => {
          loadedLists.push({ id: doc.id, ...doc.data() });
        });
        setLists(loadedLists);
      } catch (error) {
        alert('No se pudieron cargar las listas');
        console.error(error);
      }
    };
    fetchLists();
  }, []);

  // Guardar una nueva lista en Firestore
  const handleAddList = async (title, description, image) => {
    try {
      const userEmail = auth.currentUser.email;
      const newList = {
        title,
        description,
        image,
        videos: [],
      };
      const docRef = await addDoc(
        collection(FIREBASE_STORAGE, 'users', userEmail, 'listas'),
        newList
      );
      setLists([...lists, { id: docRef.id, ...newList }]);
    } catch (error) {
      alert('No se pudo guardar la lista');
      console.error(error);
    }
  };

  const handleListPress = (item) => {
    navigate(`/lista/${item.id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Listas</div>
      <div style={styles.scrollContainer}>
        {lists.length === 0 ? (
          <div style={styles.emptyMessage}>No tienes listas todavía.</div>
        ) : (
          lists.map((item) => (
            <ListComponent
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              onPress={() => handleListPress(item)}
            />
          ))
        )}
      </div>
      <AddButton onClick={() => setPopupVisible(true)} />
      <AddList
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onAddList={handleAddList}
      />
      <Menu active="listas" onNavigate={route => navigate('/' + route)} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#1C1C1C',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  title: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    marginTop: 50,
    fontFamily: 'sans-serif',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    marginBottom: 80,
    overflowY: 'auto',
  },
  emptyMessage: {
    color: '#B0B0B0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
};