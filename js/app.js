// Wilkesboro Today - Main Application

// DOM Elements
const featuredArticleEl = document.getElementById('featured-article');
const latestNewsEl = document.getElementById('latest-news');
const weatherEl = document.getElementById('weather');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedArticle();
  loadLatestNews();
  loadWeather();
  
  // Refresh data every 5 minutes
  setInterval(() => {
    loadFeaturedArticle();
    loadLatestNews();
  }, 5 * 60 * 1000);
});

// Load featured article
async function loadFeaturedArticle() {
  try {
    const { data, error } = await supabase
      .from('news_items')
      .select('*')
      .eq('status', 'Approved')
      .order('published_date', { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    
    if (data) {
      renderFeaturedArticle(data);
    } else {
      featuredArticleEl.innerHTML = '<div class="empty">No featured article available</div>';
    }
  } catch (error) {
    console.error('Error loading featured article:', error);
    featuredArticleEl.innerHTML = '<div class="error">Failed to load article</div>';
  }
}

// Render featured article
function renderFeaturedArticle(article) {
  featuredArticleEl.innerHTML = `
    <article class="featured-card">
      <div class="featured-image"></div>
      <div class="featured-content">
        <span class="category">${escapeHtml(article.category)}</span>
        <h1 class="featured-title">${escapeHtml(article.headline)}</h1>
        <p class="featured-summary">${escapeHtml(article.summary)}</p>
        <div class="meta">
          ${escapeHtml(article.source)} &bull; ${formatDate(article.published_date)}
        </div>
      </div>
    </article>
  `;
}

// Load latest news
async function loadLatestNews() {
  try {
    const { data, error } = await supabase
      .from('news_items')
      .select('*')
      .eq('status', 'Approved')
      .order('published_date', { ascending: false })
      .range(1, 6);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      renderLatestNews(data);
    } else {
      latestNewsEl.innerHTML = '<div class="empty">No news articles available</div>';
    }
  } catch (error) {
    console.error('Error loading latest news:', error);
    latestNewsEl.innerHTML = '<div class="error">Failed to load news</div>';
  }
}

// Render latest news
function renderLatestNews(articles) {
  latestNewsEl.innerHTML = articles.map(article => `
    <article class="news-card">
      <div class="news-image"></div>
      <div class="news-content">
        <span class="category-small">${escapeHtml(article.category)}</span>
        <h3 class="news-title">${escapeHtml(article.headline)}</h3>
        <p class="news-summary">${escapeHtml(article.summary)}</p>
        <div class="meta">
          ${escapeHtml(article.source)} &bull; ${formatDate(article.published_date)}
        </div>
      </div>
    </article>
  `).join('');
}

// Load weather
async function loadWeather() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=36.1585&longitude=-81.1526&current=temperature_2m,relative_humidity_2m,weather_code&timezone=America/New_York'
    );
    
    if (!response.ok) throw new Error('Weather API failed');
    
    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    console.error('Error loading weather:', error);
    weatherEl.innerHTML = '<div class="error">Weather unavailable</div>';
  }
}

// Render weather
function renderWeather(data) {
  const temp = Math.round(data.current.temperature_2m);
  const humidity = data.current.relative_humidity_2m;
  
  weatherEl.innerHTML = `
    <div class="weather-main">
      <div class="weather-temp">
        <span class="temp-value">${temp}</span>
        <span class="temp-unit">°F</span>
      </div>
      <div class="weather-icon">☀️</div>
    </div>
    <div class="weather-location">Wilkesboro, NC</div>
    <div class="weather-details">
      <div class="weather-detail">
        <span class="detail-label">Humidity</span>
        <span class="detail-value">${humidity}%</span>
      </div>
    </div>
  `;
}

// Utility: Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Utility: Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
