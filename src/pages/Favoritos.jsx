import React, { useEffect, useState } from 'react';
import { FIREBASE_STORAGE, auth } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Video from '../components/Video';
import AddButton from '../components/AddButton';
import AddVideo from '../components/AddVideo';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function Favoritos() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userEmail = auth.currentUser.email;
        const querySnapshot = await getDocs(
          collection(FIREBASE_STORAGE, 'users', userEmail, 'favoritos')
        );
        const loadedVideos = [];
        querySnapshot.forEach((doc) => {
          loadedVideos.push({ id: doc.id, ...doc.data() });
        });
        setVideos(loadedVideos);
      } catch (error) {
        alert('No se pudieron cargar los videos favoritos');
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddVideo = async (url) => {
    if (!isValidURL(url)) {
      alert("La URL no es válida");
      return;
    }
    let type = "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      type = "YouTube";
    } else if (url.includes("instagram.com")) {
      type = "Instagram";
    } else {
      alert("No se reconoce el tipo de video. Solo se admiten YouTube o Instagram.");
      return;
    }
    const thumbnail = type === "YouTube" ? generateThumbnail(url) : null;
    const title = await fetchVideoTitle(url);
    const newVideo = {
      title,
      type,
      url,
      thumbnail,
    };
    try {
      const userEmail = auth.currentUser.email;
      const docRef = await addDoc(
        collection(FIREBASE_STORAGE, 'users', userEmail, 'favoritos'),
        newVideo
      );
      setVideos([...videos, { ...newVideo, id: docRef.id }]);
    } catch (error) {
      alert('No se pudo guardar el video');
      console.error(error);
    }
  };

  const handleVideoPress = (url) => {
    window.open(url, '_blank');
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        alert('Faltan datos de usuario');
        return;
      }
      await deleteDoc(doc(FIREBASE_STORAGE, 'users', userEmail, 'favoritos', videoId.toString()));
      setVideos(videos.filter((video) => video.id !== videoId));
    } catch (error) {
      alert('No se pudo borrar el video');
      console.error(error);
    }
  };

  const generateThumbnail = (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com")) {
        if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1]?.split("?")[0];
        } else {
          videoId = url.split("v=")[1]?.split("&")[0];
        }
      }
      return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
    } catch {
      return null;
    }
  };

  const fetchVideoTitle = async (url) => {
    try {
      let videoId = null;
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com")) {
        if (url.includes("shorts/")) {
          videoId = url.split("shorts/")[1]?.split("?")[0];
        } else {
          videoId = url.split("v=")[1]?.split("&")[0];
        }
      }
      if (videoId) {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        const data = await response.json();
        return data.title;
      } else {
        return "Título no disponible";
      }
    } catch {
      return "Título no disponible";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Favoritos</div>
      <div style={styles.scrollContainer}>
        {videos.length === 0 ? (
          <div style={styles.emptyMessage}>No tienes videos favoritos todavía.</div>
        ) : (
          videos.map((item) => (
            <Video
              key={item.id}
              title={item.title}
              image={item.thumbnail}
              type={item.type}
              onPress={() => handleVideoPress(item.url)}
              onDelete={() => handleDeleteVideo(item.id)}
            />
          ))
        )}
      </div>
      <AddButton onClick={() => setPopupVisible(true)} />
      <AddVideo
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onAddVideo={handleAddVideo}
      />
      <Menu active="favoritos" onNavigate={route => navigate('/' + route)} />
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