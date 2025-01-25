import { useState } from 'react';
import './Row.css';
import { faker } from '@faker-js/faker';

export default function Row({
	author,
	isbn,
	publisher,
	review,
	title,
	count,
	format,
	image,
	avrReviews,
	avrLikes,
}) {
	const [open, setOpen] = useState(false);

	function handleOpen() {
		setOpen((prevState) => !prevState);
	}

	const array = Array(Math.ceil(avrReviews)).fill(0);

	function sentence() {
		let sentence = '';
		for (let i = 0; i < avrReviews + 1; i++) {
			sentence += sentence;
		}
	}

	return (
		<div className="row" onClick={handleOpen}>
			<p>{count}</p>
			<p>{isbn}</p>
			<p>{title}</p>
			<p>{author}</p>
			<p>{publisher}</p>

			{open && (
				<section className="details">
					<div>
						<img src={image} alt="" className="img" />
					</div>
					<div>
						<p>{title}</p>
						<p>{format}</p>
						<p>{author}</p>
						<p>{review}</p>
						{array.map((review) => {
							return <p className="sentence">{faker.lorem.sentence()}</p>;
						})}
						<p>Likes: {avrLikes}</p>
					</div>
				</section>
			)}
		</div>
	);
}
