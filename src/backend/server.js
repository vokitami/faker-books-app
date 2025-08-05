import express from 'express';
import cors from 'cors';
import { Faker, en, es_MX, de, ja } from '@faker-js/faker';

const app = express();
const PORT = 5000;

app.use(cors());

// Locale map for Faker
const localeMap = {
  "en-US": en,
  "es-MX": es_MX,
  "de-DE": de,
  "ja-JP": ja
};

app.get('/api/books', (req, res) => {
  const { lang = 'en-US', seed = '12345', likes = 5, reviews = 0, page = 1 } = req.query;

  // Create a Faker instance with the selected locale
  const faker = new Faker({ locale: [localeMap[lang] || en] });

  // Convert numeric values to numbers
  const seedNum = parseInt(seed);
  const likesNum = parseFloat(likes);
  const reviewsNum = parseFloat(reviews);
  const pageNum = parseInt(page);

  // Combine seed and page number for reproducible data
  faker.seed(seedNum + pageNum);

  const books = [];

  for (let i = 0; i < (pageNum === 1 ? 20 : 10); i++) {
    const index = (pageNum - 1) * 10 + i + 1;

    // Generate book
    const title = faker.commerce.productName();
    const author = faker.person.fullName();
    const publisher = faker.company.name();
    const isbn = faker.string.alphanumeric(13);

    // Calculate likes and reviews
    const bookLikes = Math.round(likesNum);
    const bookReviews = generateReviews(faker, reviewsNum);

    books.push({
      index,
      isbn,
      title,
      author,
      publisher,
      likes: bookLikes,
      reviews: bookReviews,
    });
  }

  res.json(books);
});

// Function to generate reviews (receives a faker instance)
function generateReviews(faker, avg) {
  if (avg === 0) return [];
  const reviews = [];
  if (avg < 1) {
    if (Math.random() < avg) {
      reviews.push({
        author: faker.person.fullName(),
        text: faker.lorem.sentence(),
      });
    }
  } else {
    for (let i = 0; i < Math.floor(avg); i++) {
      reviews.push({
        author: faker.person.fullName(),
        text: faker.lorem.sentence(),
      });
    }
  }
  return reviews;
}

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
