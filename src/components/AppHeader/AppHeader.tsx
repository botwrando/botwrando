import { AppBar, Button, Toolbar, Typography, Hidden, Box } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import { getDefaultRun, Run } from '../../lib/run';
import { SeedInfo } from '../SeedInfo/SeedInfo';
import './AppHeader.scss';

type AppHeaderProps = {
  seed: string;
  showSeed: boolean;
  setRun: (value: React.SetStateAction<Run>) => void;
};


export function AppHeader({ seed, showSeed, setRun }: AppHeaderProps) {
  const onQuit = () => setRun(getDefaultRun());

  const onToggleShowSeed = () => {
    setRun(prev => ({ ...prev, showSeed: !prev.showSeed }));
  };

  return (
    <AppBar elevation={0} color='transparent' position='static'>
      <Toolbar disableGutters={true} className='appheader'>
        <Hidden smDown>
          <Box mr={2}>
            <Typography variant='h6' > BOTW All Shrines Randomizer </Typography>
          </Box>
        </Hidden>
        <Hidden xsDown mdUp>
          <Box mr={2}>
            <Typography variant='h6' > Randomizer </Typography>
          </Box>
        </Hidden>
        {seed && (
          <>
            <SeedInfo seed={seed} showSeed={showSeed} toggleShowSeed={onToggleShowSeed} />
            <Button {...{ id: 'quit', startIcon: <ArrowBack />, onClick: onQuit }}>
              Quit run
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
