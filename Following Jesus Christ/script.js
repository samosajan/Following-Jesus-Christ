// Back-to-Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 200) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// script.js
// script.js

// DOM Elements
const bookInput = document.getElementById("book-input");
const chapterInput = document.getElementById("chapter-input");
const verseInput = document.getElementById("verse-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const loading = document.getElementById("loading");

// Bible Data (Example: Genesis has 50 chapters)
const bibleData = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Solomon": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  Jude: 1,
  Revelation: 22,
};

// Function to fetch Bible verses
async function fetchBibleVerse(book, chapter, verse) {
  try {
    // Show loading indicator
    loading.style.display = "block";
    searchResults.innerHTML = "";

    // Build the query string
    let query = `${book} ${chapter}`;
    if (verse) {
      query += `:${verse}`;
    }

    // Fetch data from the Bible API
    const response = await fetch(`https://bible-api.com/${query}?translation=kjv`);
    const data = await response.json();

    // Display the results
    if (data.verses) {
      const verses = data.verses.map(verse => `
        <div class="verse">
          <strong>${verse.book_name} ${verse.chapter}:${verse.verse}</strong>
          <p>${verse.text}</p>
        </div>
      `).join("");
      searchResults.innerHTML = verses;
    } else {
      searchResults.innerHTML = `<p>No results found for "${query}".</p>`;
    }
  } catch (error) {
    console.error("Error fetching Bible verse:", error);
    searchResults.innerHTML = `<p>An error occurred. Please try again.</p>`;
  } finally {
    // Hide loading indicator
    loading.style.display = "none";
  }
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const book = bookInput.value.trim();
  const chapter = chapterInput.value.trim();
  const verse = verseInput.value.trim();

  if (book && chapter) {
    fetchBibleVerse(book, chapter, verse);
  } else {
    searchResults.innerHTML = `<p>Please enter a Book and Chapter.</p>`;
  }
});

// Populate Chapters based on the selected Book
bookInput.addEventListener("input", () => {
  const book = bookInput.value.trim();
  if (bibleData[book]) {
    chapterInput.setAttribute("max", bibleData[book]);
    chapterInput.placeholder = `Chapter (1-${bibleData[book]})`;
  } else {
    chapterInput.removeAttribute("max");
    chapterInput.placeholder = "Chapter (e.g., 1)";
  }
});

// Optional: Allow pressing "Enter" to search
bookInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
chapterInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
verseInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});


// Music Player Functionality
const audioPlayer = document.getElementById('audio-player');
const playlistItems = document.querySelectorAll('#playlist li a');

playlistItems.forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    audioPlayer.src = this.getAttribute('data-src');
    audioPlayer.play();
  });
});