import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  cardContainer: {
    maxWidth: '300px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#1C1E28',
    textAlign: 'center',
    paddingBottom: '10px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  header: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px',
    color: 'white',
  },
  body: {
    fontSize: '14px',
    color: 'white',
    padding: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
  button: {
    backgroundColor: '#3182CE',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
};

const DashCards = ({ title, description, buttonText, imageSrc, to }) => {
  return (
    <div style={styles.cardContainer}>
      <img src={imageSrc} alt={title} style={styles.image} />
      <div style={styles.header}>{title}</div>
      <div style={styles.body}>{description}</div>
      <div style={styles.footer}>
        <Link to={to} style={styles.button}>{buttonText}</Link>
      </div>
    </div>
  );
};

export default DashCards;