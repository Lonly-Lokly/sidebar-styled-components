import { useState } from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme/theme';
import styled from 'styled-components';

library.add(fas);

const CenteredBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex: 1;
  background: bisque;
`;

const ThemeBtn = styled.button`
  margin: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: ${props => props.theme.buttonBg};
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 1.1em;
  transition: background 0.2s;
  &:active {
    background: ${props => props.theme.buttonBgActive};
  }
`;

export default function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light';
      document.body.classList.toggle('dark-theme', next === 'dark');
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <CenteredBtnWrapper>
          <ThemeBtn onClick={toggleTheme}>
            Сменить тему
          </ThemeBtn>
        </CenteredBtnWrapper>
      </div>
    </ThemeProvider>
  );
}