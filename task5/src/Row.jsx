import { useState } from 'react';
import './Row.css';

export default function Row({ author, isbn, publisher, review, title, count }) {
	const [open, setOpen] = useState(false);

	function handleOpen() {
		setOpen((prevState) => !prevState);
	}

	return (
		<div className="row" onClick={handleOpen}>
			<p>{count}</p>
			<p>{isbn}</p>
			<p>{title}</p>
			<p>{author}</p>
			<p>{publisher}</p>
			{open && <p>{review}</p>}
		</div>
	);
}
