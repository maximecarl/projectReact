import './styles/dist/main.css';
import './index.css';
import { useState } from 'react';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  const [language, setLanguage] = useState('fr');

  const handleLanguage = function(event) {
    setLanguage(event.target.value);
  }

  return (
    <>
      {
        language
        ? <>
            <Body language={language}/>
            <Footer language={language} setLanguage={handleLanguage}/>
          </>
        : ''
      }
    </>
  );
}

export default App;