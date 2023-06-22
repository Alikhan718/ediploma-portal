import React from 'react';


interface ItemHintProps {
	id: string;
	text: string;
}

export const ItemHint: React.FC<ItemHintProps> = ({ id, text }) => {
	const [show, setShow] = React.useState(false);

	return (
		<span
			id={id}
			style={{
				left: "0",
				// "top": "100%",
				display: show ? "block" : "none",
				position: "absolute",
				color: "rgb(99 99 99)",
				backgroundColor: "rgb(232 232 232)",
				borderRadius: ".3rem",
				fontSize: "1.1428571428571428rem",
				padding: ".5rem .5rem .5rem 1rem",
				zIndex: "99",
				fontWeight: "500",
				// height: "100%",
				whiteSpace: "pre-line"
			}}
			onMouseLeave={
				() => setShow(false)
			}
			onMouseEnter={
				() => setShow(true)
			}
		>{text}</span>
	);
};
