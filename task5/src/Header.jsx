import './Header.css';

export default function Header({
	handleSeed,
	seed,
	range,
	handleRange,
	review,
	handleReview,
	language,
	handleLanguage,
}) {
	return (
		<section className="header">
			<section>
				<div className="options">
					<div className="option">
						<label className="option__label" htmlFor="language">
							Language
						</label>
						<select
							name="language"
							id="language"
							className="option__input"
							value={language}
							onChange={handleLanguage}
						>
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="ru">Russian</option>
						</select>
					</div>
					<div className="option">
						<label htmlFor="seed" className="option__label">
							Seed
						</label>
						<input
							type="number"
							className="option__input"
							value={seed}
							onChange={handleSeed}
						/>
					</div>
					<div className="option">
						<label htmlFor="likes" className="option__label">
							Likes
						</label>
						<input
							type="range"
							name="likes"
							id="likes"
							value={range}
							onChange={handleRange}
							min="0"
							step="0.1"
							max="10"
							className="option__input"
						/>
					</div>
					<div className="option">
						<label htmlFor="review" className="option__label">
							Review
						</label>
						<input
							type="number"
							name="review"
							id="review"
							className="option__input"
							value={review}
							onChange={handleReview}
							step="0.1"
						/>
					</div>
				</div>
			</section>
			<section className="header__books">
				<p>#</p>
				<p>ISBN</p>
				<p>Title</p>
				<p>Author(s)</p>
				<p>Publisher</p>
			</section>
		</section>
	);
}
