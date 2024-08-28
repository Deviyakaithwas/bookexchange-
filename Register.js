import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
      const token = await response.json();
      localStorage.setItem('token', token);
      window.location.href = '/book-listing';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
    );
    };

        
