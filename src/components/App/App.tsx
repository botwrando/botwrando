import { ButtonProps, createMuiTheme, responsiveFontSizes, ThemeProvider, CssBaseline } from '@material-ui/core';
import React from 'react';
import '../../assets/bloodmoon.svg';
import { getDefaultRun, Run } from '../../lib/run';
import '../../styles/style.scss';
import { RunManager } from '../RunManager/RunManager';
import { DistanceExplorer } from '../DistanceExplorer/DistanceExplorer';


let theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#0C2024',
    },
    primary: {
      main: '#538E24',
    },
    secondary: {
      main: '#3E7531',
    },
    text: {
      primary: '#F9F4CE',
    }
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'Roboto',
      'sans-serif'
    ].join(',')
  },
});

theme = responsiveFontSizes(theme);

export const defaultButtonAttrs: ButtonProps = {
  color: 'primary',
  variant: 'contained',
  size: 'large',
};

function App(props: { type: string }) {
  return (
    <>
      <link rel="preload" href="assets/bloodmoon.svg" as="image"></link>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          (props.type === 'distances') ?
            <DistanceExplorer /> :
            <RunManager run={getDefaultRun()} />
        }
      }
      </ThemeProvider>
    </>
  );
}

export default App;
