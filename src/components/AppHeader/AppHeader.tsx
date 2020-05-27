import { AppBar, Button, Toolbar, Typography, Hidden } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import React from 'react';
import { getDefaultRun, Run } from '../../lib/run';
import { SeedInfo } from '../SeedInfo/SeedInfo';
import './AppHeader.scss';

type AppHeaderProps = {
  run?: Run;
  setRun: (value: React.SetStateAction<Run>) => void;
};


export function AppHeader({ run, setRun }: AppHeaderProps) {
  const onQuit = () => setRun(getDefaultRun());

  const onToggleShowSeed = () => {
    setRun(prev => ({ ...prev, showSeed: !prev.showSeed }));
  };

  return (
    <AppBar color='transparent' position='static'>
      <Toolbar className='appheader'>
        <Hidden mdDown>
          <Typography variant='h6' > BOTW All Shrines Randomizer </Typography>
        </Hidden>
        <Hidden xsDown lgUp>
          <Typography variant='h6' > Randomizer </Typography>
        </Hidden>
        {run && run.seed && (
          <>
            <SeedInfo seed={run.seed} showSeed={run.showSeed} toggleShowSeed={onToggleShowSeed} />
            <Button {...{ color: 'primary', id: 'quit', startIcon: <ArrowBack />, onClick: onQuit }}>
              Quit run
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
