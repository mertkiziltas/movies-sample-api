# Movies Sample API

A simple Node.js and Express-based API for managing a movie collection. This API includes endpoints for retrieving, adding, and querying movies.

---

## Features

- Fetch all movies with a limit.
- Fetch a specific movie by title.
- Add a new movie to the collection.

---

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/movies-sample-api.git
   cd movies-sample-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure it as follows:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`.

---

## API Endpoints

### Base URL

```
http://localhost:<PORT>
```

### Endpoints

#### 1. Get All Movies (with a limit of 50)

**Endpoint:**

```
GET /movies
```

**Response:**

- 200 OK: Returns an array of movies (limited to 50).
- 404 Not Found: No movies found.

#### 2. Get a Movie by Title

**Endpoint:**

```
GET /movies/:title
```

**Parameters:**

- `title` (string): The title of the movie to fetch.

**Response:**

- 200 OK: Returns the movie object.
- 404 Not Found: Movie not found.

#### 3. Add a New Movie

**Endpoint:**

```
POST /movies
```

**Body:**

```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "releaseYear": 2010
}
```

**Response:**

- 201 Created: Returns the ID of the newly created movie.
- 500 Internal Server Error: An error occurred while adding the movie.

---

## Project Structure

```
movies-sample-api/
├── db/
│   └── db.js          # Database connection setup
├── routes/
│   ├── movies.js      # Movies routes
│   └── users.js       # (Optional) Users routes
├── .env               # Environment variables
├── app.js             # Main application file
├── package.json       # Project metadata and dependencies
└── README.md          # Documentation
```

---

## Example Usage

### Fetch All Movies

```bash
curl -X GET http://localhost:3000/movies
```

### Fetch a Specific Movie by Title

```bash
curl -X GET http://localhost:3000/movies/Inception
```

### Add a New Movie

```bash
curl -X POST http://localhost:3000/movies \
-H "Content-Type: application/json" \
-d '{
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "releaseYear": 2008
}'
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributions

Feel free to fork the project and submit pull requests. Contributions are welcome!

---

## Author

[Your Name](https://github.com/yourusername)

---

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
