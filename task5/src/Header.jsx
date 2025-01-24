import './Header.css';

export default function Header() {
	return (
		<main>
			<section className="header">
				<div className="options">
					<div className="option">
						<label className="option__label" htmlFor="language">
							Language
						</label>
						<select name="language" id="language" className="option__input">
							<option value="english">English</option>
							<option value="spanish">Spanish</option>
							<option value="russian">Russian</option>
						</select>
					</div>
					<div className="option">
						<label htmlFor="seed" className="option__label">
							Seed
						</label>
						<input type="text" className="option__input" />
					</div>
					<div className="option">
						<label htmlFor="likes" className="option__label">
							Likes
						</label>
						<input
							type="range"
							name="likes"
							id="likes"
							min="0"
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
		</main>
	);
}
