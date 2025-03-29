import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Eventify</h1>
        <p>
          Eventify is an innovative platform designed to streamline event management for colleges. 
          It centralizes all event-related details, ensuring students stay updated without relying on scattered social media posts.
        </p>

        <h2>Why Eventify?</h2>
        <p>
          In many colleges, event information is often dispersed across multiple channels, making it difficult for students 
          to track and register for events efficiently. Eventify eliminates this problem by offering a single platform
          where students can explore, register, and even make payments for events seamlessly.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>📅 <strong>Event details and registration:</strong> View upcoming events, their descriptions, and register with a single click.</li>
          <li>💳 <strong>Secure Payment Integration:</strong> Easily pay for fee-based events through trusted payment gateways.</li>
          <li>🎟 <strong>Automated ID Card Generation:</strong> Get a digital event pass with a unique barcode for quick verification.</li>
          <li>👥 <strong>Organizer Dashboard:</strong> Manage event registrations, verify attendees, and track analytics in real-time.</li>
          <li>📍 <strong>Location-based Event Filtering:</strong> Find relevant events based on your location and preferences.</li>
        </ul>

        <h2>How It Works?</h2>
        <ol>
          <li><strong>For Students:</strong> Browse events, register, pay (if required), and receive a unique ID for entry.</li>
          <li><strong>For Organizers:</strong> Create and manage events, track registrations, and validate attendees using barcode scanning.</li>
          <li><strong>For Colleges:</strong> Offer a streamlined event experience with real-time insights on student participation.</li>
        </ol>

        <h2>Benefits</h2>
        <ul>
          <li>✔️ Reduces manual work for organizers</li>
          <li>✔️ Ensures no student misses an event</li>
          <li>✔️ Provides a secure and transparent event management system</li>
          <li>✔️ Supports both online and offline event verification</li>
        </ul>

        <p>
          Whether you’re a student looking for exciting events or an organizer managing registrations, 
          Eventify makes the entire process smooth and hassle-free.
        </p>
      </div>
      <footer>© {new Date().getFullYear()} Sanket Adhav. All rights reserved.</footer>
    </div>
  );
};

export default About;
