import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa'; // Import thumbs-up icon from React Icons

// PostingCard Component
const PostingCard = ({ profileImg, userName, timePosted, content, postImg, initialLikes }) => {
  // Using React useState to manage the like count
  const [likes, setLikes] = useState(+initialLikes || 0);
  const [liked, setLiked] = useState(false);

  // Function to handle like button click
  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked); // Toggle the liked state
  };

  return (
    <div style={styles.cardContainer}>
      {/* Header: Profile image, username, and time */}
      <div style={styles.header}>
        <img src={profileImg} alt="profile" style={styles.profileImg} />
        <div style={styles.userInfo}>
          <h4 style={styles.userName}>{userName}</h4>
          <p style={styles.timePosted}>{timePosted}</p>
        </div>
      </div>

      {/* Content: The actual post text */}
      <div style={styles.content}>
        <p>{content}</p>
      </div>

      {/* Optional Post Image */}
      {postImg && <img src={postImg} alt="post" style={styles.postImg} />}

      {/* Likes Count */}
      <p style={styles.likes}>{likes} {likes === 1 ? 'Like' : 'Likes'}</p>

      {/* Footer: Like, Comment, and Share buttons */}
      <div style={styles.footer}>
        <button style={styles.button} onClick={handleLike}>
          <FaThumbsUp style={{ marginRight: '8px' }} /> {liked ? 'Unlike' : 'Like'}
        </button>
        <button style={styles.button}>Comment</button>
        <button style={styles.button}>Share</button>
      </div>
    </div>
  );
};

// Styles (Inline Styles for simplicity)
const styles = {
  cardContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    maxWidth: '500px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  profileImg: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '16px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  timePosted: {
    margin: '0',
    fontSize: '12px',
    color: '#888',
  },
  content: {
    marginBottom: '16px',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  postImg: {
    width: '500px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  likes: {
    margin: '10px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1877F2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
};

export default PostingCard