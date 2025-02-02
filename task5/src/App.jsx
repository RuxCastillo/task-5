import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Row from './Row';
import { faker, fakerES, fakerRU } from '@faker-js/faker';

let count = 1;

function App() {
	const [books, setBooks] = useState([]);
	const [seed, setSeed] = useState(0);
	const [range, setRange] = useState();
	const [review, setReview] = useState();
	const [language, setLanguage] = useState('en');

	const generateBooks = () => {
		let currentFaker = faker;
		if (language === 'es') {
			currentFaker = fakerES;
		} else if (language === 'ru') {
			currentFaker = fakerRU;
		}
		currentFaker.seed(Number(seed));
		console.log(seed, language);

		// Generar nuevos libros
		const newBooks = Array.from({ length: 500 }, () => ({
			title:
				language === 'en'
					? currentFaker.book.title(3)
					: currentFaker.lorem.words(3),
			isbn: currentFaker.commerce.isbn(),
			author: currentFaker.person.fullName(),
			publisher: currentFaker.company.name(),
			//publisher: currentFaker.book.publisher(),
			image: currentFaker.image.url({ width: 200, height: 300 }),
			format: currentFaker.book.format(),
			sentence: currentFaker.lorem.sentence(),
			avrLikes: currentFaker.number.float({
				min: 0,
				max: 10,
				precision: 0.1,
				fractionDigits: 1,
			}),
			avrReviews: currentFaker.number.float({
				min: 0,
				max: 10,
				precision: 0.1,
				fractionDigits: 1,
			}),
		}));

		// Aplicar filtros antes de agregar los libros al estado
		const filteredBooks = newBooks.filter((book) => {
			const avrReviewsFloor = Math.floor(book.avrReviews);
			const avrLikesFloor = Math.floor(book.avrLikes);

			// Aplicar filtro de reviews
			const reviewFilter =
				review > -1 ? avrReviewsFloor === Math.floor(review) : true;

			// Aplicar filtro de range (likes)
			const rangeFilter =
				range > -1 ? avrLikesFloor === Math.floor(range) : true;

			return reviewFilter && rangeFilter;
		});

		// Agregar los libros filtrados al estado
		setBooks((prevState) => [...prevState, ...filteredBooks]);
	};

	/* 	const generateBooks = () => {
		let currentFaker = faker;
		if (language === 'es') {
			currentFaker = fakerES;
		} else if (language === 'ru') {
			currentFaker = fakerRU;
		}
		currentFaker.seed(Number(seed));
		console.log(seed, language);
		const newBooks = Array.from({ length: 20 }, () => ({
			isbn: currentFaker.commerce.isbn(),
			title: currentFaker.book.title(3),
			author: currentFaker.person.fullName(),
			publisher: currentFaker.book.publisher(),
			image: currentFaker.image.url({ width: 200, height: 300 }),
			format: currentFaker.book.format(),
			sentence: currentFaker.lorem.sentence(),
			avrLikes: currentFaker.number.float({
				min: 0,
				max: 10,
				precision: 0.1,
				fractionDigits: 1,
			}),
			avrReviews: currentFaker.number.float({
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
		if (review > 0) {
			newBooks = newBooks.filter((book) => {
				const avrReviewsFloor = Math.floor(book.avrReviews);
				return (
					avrReviewsFloor === Math.floor(review) ||
					avrReviewsFloor === Math.ceil(review)
				);
			});
		}
		if (range > 0) {
			newBooks = newBooks.filter((book) => {
				const avrLikesFloor = Math.floor(book.avrLikes);
				return (
					avrLikesFloor === Math.floor(range) ||
					avrLikesFloor === Math.ceil(range)
				);
			});
		}
		setBooks((prevState) => [...prevState, ...newBooks]);
	} */
	useEffect(() => {
		count = 1;
		setBooks([]);
		generateBooks();
	}, [seed, range, review, language]);

	function throttle(func, limit) {
		let inThrottle;
		return function (...args) {
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	}

	useEffect(() => {
		const handleScroll = throttle(() => {
			if (
				window.innerHeight + window.scrollY + 500 >=
				document.body.offsetHeight
			) {
				generateBooks(); // Append new books
			}
		}, 50);
		if (books.length < 20) {
			generateBooks();
		}

		window.addEventListener('scroll', handleScroll);
	}, [seed, range, review, language]);

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

	function handleReview(e) {
		setBooks([]);
		setReview(e.target.value);
	}

	function handleLanguage(e) {
		setBooks([]);
		setLanguage(e.target.value);
	}

	return (
		<main>
			<Header
				handleSeed={handleSeed}
				seed={seed}
				handleRange={handleRange}
				range={range}
				handleReview={handleReview}
				review={review}
				handleLanguage={handleLanguage}
				language={language}
			/>
			{books.map((book, index) => (
				<Row key={index} {...book} count={count++} />
			))}
		</main>
	);
}

export default App;
