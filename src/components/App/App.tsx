import { ButtonProps, createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import '../../assets/bloodmoon.svg';
import { getDefaultRun, Run } from '../../lib/run';
import '../../styles/style.scss';
import { RunManager } from '../RunManager/RunManager';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#538E24',
    }
  }
})

export const defaultButtonAttrs: ButtonProps = {
  color: 'primary',
  variant: 'contained',
  size: 'large',
}

function App() {
  const run: Run = getDefaultRun();

  return (
    <>
      <link rel="preload" href="assets/bloodmoon.svg" as="image"></link>
      <ThemeProvider theme={theme}>
        <RunManager run={run} />
      </ThemeProvider>
    </>
  );
}

export default App;
