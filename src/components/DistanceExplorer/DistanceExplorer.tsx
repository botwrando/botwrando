import React from 'react';
import { Waypoint } from '../../lib/waypoint';
import './DistanceExplorer.scss';

export const DistanceExplorer = () => {
  return (
    <div className='distance-explorer'>
      <table>
        <thead>
          <th></th>
          {Waypoint.all.map((w: Waypoint) => <th><strong>{w.name}</strong></th>)}
        </thead>
        <tbody>
          {
            Waypoint.all.map((a: Waypoint) => {
              return (
                <tr>
                  <td><strong>{a.name}</strong></td>
                  {Waypoint.all.map((b: Waypoint) => <td className='right'>
                    {a.dist(b).toFixed(2)}
                  </td>)}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};
