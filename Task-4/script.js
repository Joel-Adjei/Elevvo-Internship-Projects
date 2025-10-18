document.getElementById('current-year').textContent = new Date().getFullYear();

// --- Mock Data Setup ---
const initialPosts = [
    { id: 1, title: "10 Essential Tips for React State Management", date: "Oct 1, 2025", category: "Tech", description: "A deep dive into useState, useReducer, and Context API for building scalable apps.", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Tech" },
    { id: 2, title: "Exploring the Ancient Ruins of Rome", date: "Sep 25, 2025", category: "Travel", description: "A photo journal of my trip to the Colosseum, Roman Forum, and Palatine Hill.", image: "https://placehold.co/600x400/10b981/ffffff?text=Travel" },
    { id: 3, title: "The Best Homemade Chili Recipe for Fall", date: "Sep 20, 2025", category: "Food", description: "Warm up with this simple yet flavorful chili, perfect for a cozy weekend.", image: "https://placehold.co/600x400/ef4444/ffffff?text=Food" },
    { id: 4, title: "A Review of the New M5 Chip Architecture", date: "Sep 15, 2025", category: "Tech", description: "Analyzing the performance and efficiency gains of the latest mobile processor.", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Tech" },
    { id: 5, title: "Budget Travel Guide to Southeast Asia", date: "Sep 10, 2025", category: "Travel", description: "How I traveled for a month on less than $1000, including flights and accommodation.", image: "https://placehold.co/600x400/10b981/ffffff?text=Travel" },
    { id: 6, title: "Mastering the Art of Sourdough Bread", date: "Sep 5, 2025", category: "Food", description: "Step-by-step instructions for creating a perfect, tangy sourdough starter and loaf.", image: "https://placehold.co/600x400/ef4444/ffffff?text=Food" },
    { id: 1, title: "10 Essential Tips for React State Management", date: "Oct 1, 2025", category: "Tech", description: "A deep dive into useState, useReducer, and Context API for building scalable apps.", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Tech" },
    { id: 2, title: "Exploring the Ancient Ruins of Rome", date: "Sep 25, 2025", category: "Travel", description: "A photo journal of my trip to the Colosseum, Roman Forum, and Palatine Hill.", image: "https://placehold.co/600x400/10b981/ffffff?text=Travel" },
    { id: 3, title: "The Best Homemade Chili Recipe for Fall", date: "Sep 20, 2025", category: "Food", description: "Warm up with this simple yet flavorful chili, perfect for a cozy weekend.", image: "https://placehold.co/600x400/ef4444/ffffff?text=Food" },
    { id: 4, title: "A Review of the New M5 Chip Architecture", date: "Sep 15, 2025", category: "Tech", description: "Analyzing the performance and efficiency gains of the latest mobile processor.", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Tech" },
    { id: 5, title: "Budget Travel Guide to Southeast Asia", date: "Sep 10, 2025", category: "Travel", description: "How I traveled for a month on less than $1000, including flights and accommodation.", image: "https://placehold.co/600x400/10b981/ffffff?text=Travel" },
    { id: 6, title: "Mastering the Art of Sourdough Bread", date: "Sep 5, 2025", category: "Food", description: "Step-by-step instructions for creating a perfect, tangy sourdough starter and loaf.", image: "https://placehold.co/600x400/ef4444/ffffff?text=Food" },

    { id: 7, title: "Understanding Web Accessibility (A11y) in React", date: "Aug 30, 2025", category: "Tech", description: "Why making your website accessible is crucial for all users and search engines.", image: "https://placehold.co/600x400/3b82f6/ffffff?text=Tech" },
    { id: 8, title: "Himalayan Treks for Beginners", date: "Aug 25, 2025", category: "Travel", description: "Three beginner-friendly trails that offer breathtaking views without extreme difficulty.", image: "https://placehold.co/600x400/10b981/ffffff?text=Travel" },
];

const categories = ["All", "Tech", "Travel", "Food"];
const MAX_VISIBLE_POSTS = 6;

let activeCategory = "All";
let searchTerm = "";

const postGrid = document.getElementById('post-grid');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');
const categoryFilterContainer = document.getElementById('category-filter-container');
const resultsMessageContainer = document.getElementById('results-message-container');
const postListTitle = document.getElementById('post-list-title');


function createPostCardHTML(post) {
    let categoryClasses = '';
    if (post.category === 'Tech') {
        categoryClasses = 'bg-blue-100 text-blue-800';
    } else if (post.category === 'Travel') {
        categoryClasses = 'bg-green-100 text-green-800';
    } else if (post.category === 'Food') {
        categoryClasses = 'bg-red-100 text-red-800';
    }

    return `
                <div class="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 card-hover">
                    <!-- Image Container -->
                    <div class="w-full h-48 overflow-hidden">
                        <img
                            src="${post.image}"
                            alt="${post.title}"
                            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onerror="this.onerror=null;this.src='https://placehold.co/600x400/4b5563/ffffff?text=Image+Unavailable';"
                        />
                    </div>

                    <!-- Content -->
                    <div class="p-6 space-y-3">
                        <div class="flex items-center justify-between text-sm">
                            <!-- Category Tag -->
                            <span class="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${categoryClasses}">
                                ${post.category}
                            </span>
                            <!-- Date -->
                            <p class="text-gray-500">${post.date}</p>
                        </div>

                        <h2 class="text-xl font-bold text-gray-900 line-clamp-2">
                            ${post.title}
                        </h2>

                        <p class="text-gray-600 text-sm line-clamp-3">
                            ${post.description}
                        </p>

                        <!-- Read More Link -->
                        <a href="#" class="inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200">
                            Read Article &rarr;
                        </a>
                    </div>
                </div>
            `;
}


function filterPosts() {
    let result = initialPosts;

    if (activeCategory !== "All") {
        result = result.filter(post => post.category === activeCategory);
    }

    if (searchTerm) {
        const lowerCaseSearch = searchTerm.toLowerCase();
        result = result.filter(post =>
            post.title.toLowerCase().includes(lowerCaseSearch)
        );
    }
    return result;
}


function renderPosts() {
    const filtered = filterPosts();
    const visiblePosts = filtered.slice(0, MAX_VISIBLE_POSTS);

    postListTitle.innerHTML = `Latest Posts ${activeCategory !== "All" ? `<span class="text-indigo-600"> / ${activeCategory}</span>` : ''}`;

    if (visiblePosts.length > 0) {
        postGrid.innerHTML = visiblePosts.map(createPostCardHTML).join('');
        postGrid.classList.remove('justify-center'); 
    } else {
        postGrid.innerHTML = ''; 
    }

    resultsMessageContainer.innerHTML = '';

    if (filtered.length === 0) {
        resultsMessageContainer.innerHTML = `
                    <div class="text-center p-10 bg-white rounded-xl shadow-inner mt-8">
                        <p class="text-xl text-gray-600 font-semibold">
                            No posts found matching "${searchTerm}" in the ${activeCategory} category.
                        </p>
                        <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            Reset Filters
                        </button>
                    </div>
                `;
    } else if (filtered.length > MAX_VISIBLE_POSTS) {
        resultsMessageContainer.innerHTML = `
                    <div class="text-center mt-10 p-4 border border-indigo-200 bg-indigo-50 text-indigo-800 rounded-lg">
                        <p class="font-medium">
                            Showing ${MAX_VISIBLE_POSTS} of ${filtered.length} total posts in this view.
                            <span class="block text-sm text-indigo-700">A "Load More" button or full pagination would go here!</span>
                        </p>
                    </div>
                `;
    }
    updateCategoryButtons();
}


window.changeCategory = function (category) {
    activeCategory = category;
    renderPosts();
}


window.resetFilters = function () {
    activeCategory = "All";
    searchTerm = "";
    searchInput.value = "";
    updateClearButton();
    renderPosts();
}

function setupCategoryButtons() {
    categoryFilterContainer.innerHTML = categories.map(category => `
                <button
                    onclick="changeCategory('${category}')"
                    data-category="${category}"
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md"
                >
                    ${category}
                </button>
            `).join('');
    updateCategoryButtons();
}

function updateCategoryButtons() {
    document.querySelectorAll('#category-filter-container button').forEach(button => {
        const isSelected = button.getAttribute('data-category') === activeCategory;
        button.className = `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md ${isSelected
                ? 'bg-indigo-600 text-white shadow-indigo-500/50'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
            }`;
    });
}


function updateClearButton() {
    if (searchTerm) {
        clearSearchBtn.classList.remove('hidden');
    } else {
        clearSearchBtn.classList.add('hidden');
    }
}

// --- Event Listeners ---

searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value.trim();
    updateClearButton();
    renderPosts();
});

clearSearchBtn.addEventListener('click', () => {
    searchTerm = "";
    searchInput.value = "";
    updateClearButton();
    renderPosts();
});


document.addEventListener('DOMContentLoaded', () => {
    setupCategoryButtons();
    renderPosts();
});