import React from 'react';
import './HotkeyList.scss';
import { getKeyMap, getShortKeyname } from '../../lib/keyboard';

export type HotkeyListProps = {};

export const HotkeyList = (_props: HotkeyListProps) => {
  const map = getKeyMap();
  return (
    <>
      {Array.from(map).map((value: [string, Function[][]]) => {
        const [desc, keys] = value;

        const key_names = keys.map(key => key[0]);
        return (
          <div className="hotkey" key={keys.toString()}>
            <div className="keys">
              {' '}
              {key_names.map(key => (
                <div className="key" key={key.toString()}>
                  {getShortKeyname(key.toString())}
                </div>
              ))}
            </div>
            <div className="desc">{desc}</div>
          </div>
        );
      })}
    </>
  );
};
