// App.jsx - Root component managing page state
import { useState } from 'react';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';

function App() {
  // 'home' or 'form' — controls which page is shown
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' && <HomePage onGetStarted={() => setPage('form')} />}
      {page === 'form' && <UserForm onBack={() => setPage('home')} />}
    </>
  );
}

export default App;
