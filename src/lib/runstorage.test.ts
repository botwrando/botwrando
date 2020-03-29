import { decodeRun, encodeRun } from './runstorage';
import { Run, RunState } from './run';

const testrun: Run = {
  runner: 'Jest McJestyface',
  seed: 'AJESTYSEED',
  shrineIds: [1, 2, 3, 5, 8, 11, 19, 40, 59],
  state: RunState.Running,
  pausedTime: 0,
  rundate: 1585434255627,
  splits: new Map<number, number>([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4]
  ]),
  pbSplits: new Map<number, number>([]),
  wrSplits: new Map<number, number>([])
};

const encoded_testrun =
  '{"runner":"Jest McJestyface","seed":"AJESTYSEED","shrineIds":[1,2,3,5,8,11,19,40,59],"state":2,"pausedTime":0,"rundate":1585434255627,"splits":[[1,1],[2,2],[3,3],[4,4]],"pbSplits":[],"wrSplits":[]}';

describe('runstorage', () => {
  const encoded = encodeRun(testrun);

  it('properly encodes a run into JSON', () => {
    expect(encoded).toEqual(encoded_testrun);
  });
  it('properly decodes a run from JSON', () => {
    expect(decodeRun(encoded)).toEqual(testrun);
  });
  it('does not return a Run object for invalid data', () => {
    const badrun = decodeRun('{"BLARGH": "Blulululu"}');
    expect(Object.keys(badrun)).not.toEqual(Object.keys(testrun));
  });
});
