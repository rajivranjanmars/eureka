import axios from "axios";
import cheerio from "cheerio";

// Function to perform the search
async function taskSearch(query: string): Promise<Array<{ title: string; url: string }>> {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const searchResults: Array<{ title: string; url: string }> = [];
    let count = 0;

    $('div.yuRUbf a').each((index, element) => {
      if (count >= 5) return false; // Exit loop after 5 results
      const title = $(element).find('h3').text();
      const url = $(element).attr('href');
      if (title && url) {
        searchResults.push({ title, url });
        count++;
      }
    });

    return searchResults;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Usage
export default async function gSearch(query: string): Promise<Array<{ title: string; url: string }>> {
  const searchResults = await taskSearch(query);
  return searchResults;
}