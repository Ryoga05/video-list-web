import React from 'react';
import { Box } from '@chakra-ui/react';

export default function Video({ title, image, type, onPress, onDelete }) {
  if (type === 'YouTube') {
    return (
      <Box
        bg="#4B4B4B"
        display="flex"
        flexDirection="row"
        alignItems="center"
        py="30px"
        borderRadius="20px"
        border="2px solid red"
        mb="30px"
        w="100%"
        maxW="480px"
      >
        <img
          style={styles.image}
          src={image || '/default-thumb.png'}
          alt={title}
        />
        <Box sx={styles.textContainer}>
          <Box sx={styles.videoTitle}>{title}</Box>
        </Box>
        <button style={styles.iconContainer} onClick={onPress}>
          <svg width={36} height={36} viewBox="0 0 24 24">
            <path fill="white" d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button style={styles.deleteContainer} onClick={onDelete}>
          <svg width={28} height={28} viewBox="0 0 24 24">
            <path fill="red" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </Box>
    );
  }

  if (type === 'Instagram') {
    return (
      <Box
        p="2px"
        borderRadius="20px"
        mb="30px"
        bgGradient="linear(90deg, #5B51D8, #C13584, #FD1D1D, #F77737, #FFDC80)"
        w="100%"
        maxW="480px"
      >
        <Box
          bg="#4B4B4B"
          borderRadius="17px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          py="30px"
          w="100%"
          maxW="476px"
          m={0}
        >
          {image ? (
            <img
              style={styles.image}
              src={image}
              alt={title}
            />
          ) : (
            <Box sx={styles.instagramLogoBox}>
              <svg
                width="80"
                height="60"
                viewBox="0 0 80 60"
                style={{ display: 'block' }}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fd5" />
                    <stop offset="50%" stopColor="#c13584" />
                    <stop offset="100%" stopColor="#5b51d8" />
                  </linearGradient>
                </defs>
                <rect width="80" height="60" rx="10" fill="url(#ig-gradient)" />
                <circle cx="40" cy="30" r="14" fill="none" stroke="#fff" strokeWidth="4"/>
                <circle cx="62" cy="18" r="4" fill="#fff"/>
              </svg>
            </Box>
          )}
          <Box sx={styles.textContainer}>
            <Box sx={styles.videoTitle}>{title}</Box>
          </Box>
          <button style={styles.iconContainer} onClick={onPress}>
            <svg width={36} height={36} viewBox="0 0 24 24">
              <path fill="white" d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button style={styles.deleteContainer} onClick={onDelete}>
            <svg width={28} height={28} viewBox="0 0 24 24">
              <path fill="red" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </Box>
      </Box>
    );
  }

  return null;
}

const styles = {
  image: {
    width: 80,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#999',
    marginLeft: 20,
    marginRight: 20,
    objectFit: 'cover',
  },
  instagramLogoBox: {
    width: 80,
    height: 60,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, #5B51D8, #C13584, #FD1D1D, #F77737, #FFDC80)',
  },
  textContainer: {
    marginRight: 40,
    flex: 1,
    minWidth: 0,
  },
  videoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    margin: '5px 0',
    wordBreak: 'break-word',
  },
  iconContainer: {
    width: 50,
    height: 50,
    background: 'none',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    cursor: 'pointer',
    padding: 0,
  },
  deleteContainer: {
    width: 40,
    height: 40,
    background: 'none',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    cursor: 'pointer',
    padding: 0,
  },
};