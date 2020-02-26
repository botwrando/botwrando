import React from 'react';
import { getKeyMap, getShortKeyname } from './lib/keyboard';
import "./HotkeyList.scss";

export const HotkeyList = () => {
	const map = getKeyMap();
	return (
		<>
			{
				Array.from(map).map((value: [string, Function[][]]) => {
					const [desc, keys] = value;

					console.log(keys);
					const key_names = keys.map(key => key[0]);
					return (
						<div className="hotkey">
							<div className="keys">
								{
									key_names.map(key =>
										<div className="key">
											{getShortKeyname(key.toString())}
										</div>)
								}
							</div>
							<div className="desc">{desc}</div>
						</div>
					)
				})
			}
		</>
	)
}