// Existing code (e.g., cart, filters) goes here...

// Admin Login
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const adminLink = document.getElementById('admin-link');
const adminDashboard = document.getElementById('admin-dashboard');
const logoutBtn = document.getElementById('logout-btn');

loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.getElementById('add-product-modal').style.display = 'none';
}));

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'password') { // Demo credentials
        localStorage.setItem('adminLoggedIn', 'true');
        loginModal.style.display = 'none';
        adminLink.style.display = 'block';
        adminDashboard.style.display = 'block';
        loadAdminData();
    } else {
        alert('Invalid credentials');
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    adminLink.style.display = 'none';
    adminDashboard.style.display = 'none';
});

// Check if logged in on page load
if (localStorage.getItem('adminLoggedIn')) {
    adminLink.style.display = 'block';
    adminDashboard.style.display = 'block';
    loadAdminData();
}

// Data Storage (localStorage simulation)
let products = JSON.parse(localStorage.getItem('products')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || ['Women', 'Men', 'Accessories'];
let colors = JSON.parse(localStorage.getItem('colors')) || ['Black', 'White', 'Red'];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Load Admin Data
function loadAdminData() {
    loadProducts();
    loadCategories();
    loadColors();
    loadOrders();
    loadStock();
}

// Products Management
function loadProducts() {
    const list = document.getElementById('products-list');
    list.innerHTML = products.map(p => `
        <div class="data-item">
            <img src="${p.image}" alt="${p.name}" width="50">
            <span>${p.name} - ${p.price} - Stock: ${p.stock}</span>
            <button onclick="editProduct(${p.id})">Edit</button>
            <button onclick="deleteProduct(${p.id})">Delete</button>
        </div>
    `).join('');
}

document.getElementById('add-product-btn').addEventListener('click', () => {
    document.getElementById('add-product-modal').style.display = 'block';
    // Populate category dropdown
    const catSelect = document.getElementById('product-category');
    catSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
});

document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value,
        colors: document.getElementById('product-colors').value.split(','),
        sizes: document.getElementById('product-sizes').value.split(','),
        stock: document.getElementById('product-stock').value
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    document.getElementById('add-product-modal').style.display = 'none';
});

// Similar functions for edit/delete (add logic as needed)

// Categories Management
function loadCategories() {
    const list = document.getElementById('categories-list');
    list.innerHTML = categories.map(c => `<div class="data-item">${c} <button onclick="deleteCategory('${c}')">Delete</button></div>`).join('');
}

// Colors Management
function loadColors() {
    const list = document.getElementById('colors-list');
    list.innerHTML = colors.map(c => `<div class="data-item">${c} <button onclick="deleteColor('${c}')">Delete</button></div>`).join('');
}

// Orders and Stock (Simulate from cart or add manually)
function loadOrders() {
    // Simulate orders from cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    orders = cart.map(item => ({ id: item.id, name: item.name, status: 'Pending' }));
    localStorage.setItem('orders', JSON.stringify(orders));
    const list = document.getElementById('orders-list');
    list.innerHTML = orders.map(o => `<div class="data-item">${o.name} - ${o.status}</div>`).join('');
}

function loadStock() {
    const list = document.getElementById('stock-list');
    list.innerHTML = products.map(p => `<div class="data-item">${p.name} - Stock: ${p.stock}</div>`).join('');
}

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('