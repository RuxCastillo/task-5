import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Row from './Row';
import { faker } from '@faker-js/faker';

let count = 1;

function App() {
	const [books, setBooks] = useState([]);
	const [seed, setSeed] = useState(0);
	const [range, setRange] = useState(0);

	const generateBooks = () => {
		faker.seed(Number(seed));
		console.log(seed);
		const newBooks = Array.from({ length: 20 }, () => ({
			isbn: faker.commerce.isbn(),
			title: faker.book.title(3),
			author: faker.person.fullName(),
			publisher: faker.book.publisher(),
			review: faker.lorem.sentences(2),
			avrLikes: faker.number.float({
				min: 0,
				max: 10,
				precision: 0.1,
				fractionDigits: 1,
			}),
			avrReviews: faker.number.float({
				min: 0,
				max: 10,
				precision: 0.1,
				fractionDigits: 1,
			}),
		}));
		agregarLibros(newBooks);
	};

	function agregarLibros(newBooks) {
		count = 1;
		newBooks = newBooks.filter((book) => book.avrLikes > range);
		setBooks((prevState) => [...prevState, ...newBooks]);
	}

	useEffect(() => {
		generateBooks();
	}, [seed, range]);

	useEffect(() => {
		console.log(books);
	}, [books]);

	function handleSeed(e) {
		setBooks([]);
		setSeed(e.target.value);
	}

	function handleRange(e) {
		setBooks([]);
		setRange(e.target.value);
	}

	return (
		<main>
			<Header
				handleSeed={handleSeed}
				seed={seed}
				handleRange={handleRange}
				range={range}
			/>
			{books.map((book, index) => (
				<Row key={index} {...book} count={count++} />
			))}
		</main>
	);
}

export default App;
