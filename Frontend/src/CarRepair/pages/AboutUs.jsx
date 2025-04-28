import React from 'react';
import { Users, Target, Heart } from 'lucide-react';
import Sharaf from '../assets/sharaf.jpeg';
import Rifky from '../assets/rifky.png';
import ahamed from '../assets/ahamed.jpeg';
import { color } from 'framer-motion';


const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    maxWidth: '1400px',
    margin: 'auto'
  },
  section: {
    marginBottom: '40px'
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    marginTop:'20px'
    
  },
  text: {
    fontSize: '18px',
    color: 'gray',
    maxWidth: '800px',
    margin: 'auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    marginBottom:'50px'
  },
  card: {
    padding: '20px',
    borderRadius: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '2px solid #196662',
    textAlign: 'center'
  },
  icon: {
    marginBottom: '10px'
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px'
    
  },
  teamCard: {
    textAlign: 'center'
  },
  teamImage: {
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px'
  },
  desc:{
    color:'grey',
  },

 

};

const AboutUs = () => {
  const teamMembers = [
    { name: 'Rifky Faris', role: 'CTO', image: Rifky },
    { name: 'Sharaf Ahamed', role: 'CEO & Founder', image: Sharaf },
    { name: 'Ahamed Lareef', role: 'CFO', image: ahamed }
  ];

  return (
    
    <div style={styles.container}>
      <div style={styles.section}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.text}>
          Welcome to Car Connect, your trusted partner in vehicle servicing and maintenance. Our advanced vehicle servicing system is designed to provide seamless scheduling, real-time updates, and expert care for your car. Whether it’s routine maintenance, diagnostics, or major repairs, we ensure top-quality service with efficiency and transparency.
          <br /><br />
          With a commitment to customer satisfaction and cutting-edge technology, we make vehicle servicing hassle-free. Book your service today and experience the convenience of our reliable and professional automotive solutions!
        </p>
      </div>

      <div style={styles.grid}>
        {[{ icon: Users, title: 'Collaboration', text: 'Working together to achieve extraordinary results' },
          { icon: Target, title: 'Innovation', text: 'Pushing boundaries and exploring new possibilities' },
          { icon: Heart, title: 'Passion', text: 'Dedicated to delivering excellence in everything we do' }].map((item, index) => (
          <div key={index} style={styles.card}>
         <center>   <div style={styles.icon}><item.icon size={40} color='#196662' /></div></center>
            <h3>{item.title}</h3>
            <p style={styles.desc}>{item.text}</p>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading} >Our Team</h2>
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.teamCard}>
             <center> <img src={member.image} alt={member.name} style={styles.teamImage} /></center>
              <h3>{member.name}</h3>
              <p style={styles.desc}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;