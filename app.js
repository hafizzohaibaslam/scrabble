const reviewData = window.reviewData;
const reviewsContainer = document.getElementById("reviews");
const newReviewForm = document.getElementById("new-review-form");

function generateRatingStars(rating) {
	let stars = "";
	for (let i = 0; i < rating; i++) {
		stars += "★ ";
	}
	for (let i = rating; i < 5; i++) {
		stars += "☆ ";
	}
	return stars.trim();
}

function generateReviewCard(review) {
	const { name, date, rating, review: text } = review;
	const card = document.createElement("div");
	card.classList.add("review-card");
	const heading = document.createElement("h3");
	heading.textContent = name;
	const dateElement = document.createElement("p");
	dateElement.textContent = new Date(date).toLocaleDateString();
	const ratingElement = document.createElement("p");
	ratingElement.innerHTML = generateRatingStars(rating);
	const textElement = document.createElement("p");
	textElement.textContent = text;
	card.append(heading, dateElement, ratingElement, textElement);
	return card;
}

function generateReviewCards() {
	reviewsContainer.innerHTML = "";
	reviewData.forEach(review => {
		const card = generateReviewCard(review);
		reviewsContainer.appendChild(card);
	});
}

generateReviewCards();

newReviewForm.addEventListener("submit", event => {
	event.preventDefault();
	const name = event.target.elements.name.value;
	const date = event.target.elements.date.value;
	const rating = event.target.elements.rating.value;
	const review = event.target.elements.review.value;
	const newReview = {
		name,
		date,
		rating: parseInt(rating),
		review
	};
	reviewData.push(newReview);
	generateReviewCards();
	event.target.reset();
});
