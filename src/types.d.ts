declare module 'react-keyboard-event-handler' {
	type KeyboardEventHandlerProps = {
		handleKeys: string[];
		onKeyEvent: (key: string, event: KeyboardEvent) => void;
	};

	class KeyboardEventHandler extends React.Component<
		KeyboardEventHandlerProps
	> {}

	export default KeyboardEventHandler;
}
