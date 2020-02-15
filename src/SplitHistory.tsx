import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { Run } from './RunManager';
import { ShrineInfo } from './ShrineInfo';

const ShrineList = (shrine_id: number, rando_id: number, timestamp: number, diff: number, is_pb: boolean) =>
	(<ShrineInfo
		key={shrine_id}
		shrine_id={shrine_id}
		counter={rando_id}
		timestamp={timestamp}
		diff={diff}
		is_ahead={diff <= 0}
		is_pb={is_pb}
	/>)


export type SplitHistoryProps = {
	run: Run
}

export const SplitHistory = (props: SplitHistoryProps) => {
	const { run } = props;

	const has_split = (rando_id: number) => run.splits.get(rando_id);

	const get_split = (rando_id: number) => {
		const split = run.splits.get(rando_id);
		return split ? split : -1;
	}

	const get_diff = (rando_id: number): number => {
		const curr_split = run.splits.get(rando_id);
		const other_split = run.wr_splits.get(rando_id);
		if (curr_split && other_split)
			return curr_split - other_split

		return -1
	}

	const get_is_pb = (rando_id: number) => {
		const curr_split = run.splits.get(rando_id);
		const pb_split = run.pb_splits.get(rando_id);
		if (curr_split && pb_split)
			return curr_split - pb_split < 0

		return false
	}

	return (
		<div className="history">
			<ScrollableFeed forceScroll={true} className="historylist">
				{run.shrine_ids
					.filter((shrine_id, rando_id) => has_split(rando_id))
					.map((shrine_id, rando_id) =>
						ShrineList(
							shrine_id,
							rando_id,
							get_split(rando_id),
							get_diff(rando_id),
							get_is_pb(rando_id)
						))}
			</ScrollableFeed>
		</div>
	)
}

