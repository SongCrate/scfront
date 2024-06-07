# Soundcrate

Soundcrate is a music review site that allows users to rate and review songs and albums. It features trending albums, top reviews, comprehensive search capabilities, personalized profiles, and detailed song review pages.

## Table of Contents

- [Features](#features)
- [Pages](#pages)
  - [Home Page](#home-page)
  - [Search Page](#search-page)
  - [Profile Page](#profile-page)
  - [Song Review Page](#song-review-page)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Trending Albums**: Discover the latest trending albums on the home page.
- **Top Reviews**: Read top reviews from users on the home page.
- **Search**: Search for your favorite songs and albums easily.
- **User Profiles**: View and manage your lists of songs, reviews, and top albums.
- **Song Reviews**: Rate songs out of 5 stars, write text reviews, see the number of likes, and manage the lists your review is saved in.

## Pages

### Home Page

The Home Page displays trending albums and top reviews. It’s the main landing page where users can quickly see what’s popular and what others are saying about different music.

### Search Page

The Search Page allows users to search for songs and albums. It provides a comprehensive search functionality to find and explore various music pieces.

### Profile Page

The Profile Page contains a user's lists of songs, reviews, and top albums. Users can manage their personal music lists and see their contributions to the site.

### Song Review Page

The Song Review Page showcases detailed reviews by users. Each review includes:
- A rating out of 5 stars
- A text review
- The number of likes the review has received
- Lists the review has been saved in

## Technologies Used

- **JavaScript**
- **React.js**: For building the user interface
- **Node.js**: For the backend server
- **Next.js**: For server-side rendering and static site generation
- **MongoDB**: For the database

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
