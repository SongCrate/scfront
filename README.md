# Soundcrate

Soundcrate is a music review site that allows users to rate and review songs and albums. It features trending albums, top reviews, comprehensive search capabilities, personalized profiles, song/album pages, and detailed song review pages.

## Table of Contents

- [Types of Users](#types-of-users)
- [Pages](#pages)
  - [Home Page](#home-page)
  - [Search Page](#search-page)
  - [Song Page](#song-page)
  - [Album Page](#album-page)
  - [Profile Page](#profile-page)
  - [Song Review Page](#song-review-page)
  - [Navigation Bar](#navigation-bar)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Types of Users

### Unregistered Users
Unregistered users have limited capabilities on Soundcrate, being able to access the Soundcrate home page as well as the search page. They can view profile pages, song/album pages, review pages, and lists, but are unable to like reviews or publish their own ratings/reviews and song lists. When attempting to do so, they will be prompted to log in or register for an account.

### Registered Users
Registered users have full capabilities on Soundcrate, including all unregistered user capabilities. In addition, they are able to like other reviews and create their own ratings/reviews and lists. Multiple pages, such as the homepage, will also be customized to the specific user if logged in.

## Pages

### Home Page: Discover the latest trending albums & top reviews.

Through Soundcrate's homepage, viewers can see new music releases on Spotify and popular reviews from other users.

### Search Page: Search for your favorite songs and albums easily.

Soundcrate's search page allows users to easily find songs and albums by searching with song title, album title, or artist name. Clicking on a song/album will direct the user to the unique song/album page.

### Song Page: View song details.

On the song page, users can view song information such as title, artist, and album, along with the song's average rating, popular reviews, and lists the song is featured on. Users can also choose to rate/review the song and add it to their song lists if they are logged in.

### Album Page: View album details.

On the album page, users can view album information, such as title, artist, and year of release. They can also view the album tracklist, and click on any song to be led to the song's page. Top reviews of songs on the album are also featured on this page.

### Profile Page: View and manage your lists of songs, reviews, and top albums.

On the user profile page, users can view how many reviews they've written, how many albums they've reviewed songs from, how many lists they've created, how many followers they have, and how many users they are following. They can also view the user's reviews, the unique albums the user has reviewed from, and their song lists. Clicking on the individual review cards, album cards, or list cards will direct users to their respective pages.
If this is the user's own profile, they can create a new song list by clicking "+ New".

### Song Review Page: View detailed song critiques from Soundcrate users.

The Song Review Page showcases detailed reviews by users. Each review includes a rating out of 5 stars, a text review, the number of likes the review has received, and song lists the review has been saved in

Users can choose to like the review if they are logged in.

### Navigation Bar: Easy access to Soundcrate's various pages.

On every page on Soundcrate, users will be able to directly visit other pages through the navigation bar. The navigation bar has 4 main pages:
- **Soundcrate:** By clicking on Soundcrate, users are redirected to the homepage.
- **Search:** Through Search, users can visit the search page.
- **Profile:**
  -  Unregistered Users: Unregistered users can either Register or Login.
  -  Registered Users: Registered users can click on their profile icon to reveal a dropdown, allowing them to visit the following pages:
      - Profile: Visit their profile page.
      - My Account: Update their username or their profile image.
      - Settings: Update their email or password.
      - Logout: Log out of their account.


## Technologies Used

- **JavaScript**
- **React.js**: For building the user interface
- **Node.js**: For the backend server
- **Next.js**: For server-side rendering and static site generation
- **MongoDB**: For the database
- **Spotify API**: For fetching song and album information

## Installation

To run Soundcrate locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/your-username/soundcrate.git
```
2. Navigate to the project directory:
```bash
cd soundcrate
```
3. Install the dependencies:
```bash
npm install dev
npm install mongoose
npm install mongodb
```
4. Set up the environment variables:
Create a `.env.local` file in your root directory and add these environment variables.
```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=b8ecb6f67ea242adb2bd536ecad37a4b
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=d7a26e998c864e42933837cb3f5c96f6
MONGODB_URI=mongodb+srv://aanyanwu:TRrnaATjyPaxnJuC@soundcrate.m4svywb.mongodb.net/?retryWrites=true&w=majority&appName=SoundCrate
domain=http://localhost:3000/
NEXTAUTH_SECRET=YCYJVNHGFY8799
NEXTAUTH_URL=http://localhost:3000/
```
5. Run the development server:
```bash
npm run dev
```

## Usage

Once the server is running, open your browser and navigate to `http://localhost:3000` to start using Soundcrate!
