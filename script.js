// Simple in-browser storage for users
const usersKey = 'simpleUsersDB';
let users = JSON.parse(localStorage.getItem(usersKey)) || {};

// Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const contentSection = document.getElementById('content-section');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');
const freeContentBtn = document.getElementById('free-content-btn');
const premiumContentBtn = document.getElementById('premium-content-btn');
const paymentMessage = document.getElementById('payment-message');
const logoutBtn = document.getElementById('logout-btn');
const contentArea = document.getElementById('contentArea');

let loggedInUser = null;

// List of free PDFs from your GitHub Pages free-content folder
const freePdfs = [
  { name: "Cell Cycle", url: "free-content/cell-cycle.pdf" },
  { name: "Photosynthesis", url: "free-content/photosynthesis.pdf" },
  { name: "Plant Transport", url: "free-content/plant-transport.pdf" }
];

// Show register form
showRegister.onclick = () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  loginError.textContent = '';
  registerError.textContent = '';
};

// Show login form
showLogin.onclick = () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  loginError.textContent = '';
  registerError.textContent = '';
};

// Register
registerBtn.onclick = () => {
  const email = document.getElementById('register-email').value.trim().toLowerCase();
  const password = document.getElementById('register-password').value;

  registerError.textContent = '';
  if(!email || !password){
    registerError.textContent = 'Please enter email and password.';
    return;
  }
  if(users[email]){
    registerError.textContent = 'User already exists. Please login.';
    return;
  }
  // Save user
  users[email] = { password };
  localStorage.setItem(usersKey, JSON.stringify(users));
  alert('Registration successful! Please login.');
  showLogin.click();
};

// Login
loginBtn.onclick = () => {
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;

  loginError.textContent = '';
  if(!email || !password){
    loginError.textContent = 'Please enter email and password.';
    return;
  }
  if(!users[email] || users[email].password !== password){
    loginError.textContent = 'Invalid email or password.';
    return;
  }
  loggedInUser = email;
  showContentSection();
};

// Show content section after login
function showContentSection(){
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
  contentSection.style.display = 'block';
  paymentMessage.textContent = '';
  contentArea.innerHTML = ''; // clear any previous content
}

// Logout
logoutBtn.onclick = () => {
  loggedInUser = null;
  contentSection.style.display = 'none';
  loginForm.style.display = 'block';
  // Clear inputs
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  contentArea.innerHTML = '';
  paymentMessage.textContent = '';
};

// Open free content list with buttons to open PDFs
freeContentBtn.onclick = () => {
  contentArea.innerHTML = "<h3>Free Subjects:</h3>";

  freePdfs.forEach(pdf => {
    const btn = document.createElement('button');
    btn.textContent = pdf.name;
    btn.style.margin = "5px";
    btn.onclick = () => {
      window.open(pdf.url, '_blank');
    };
    contentArea.appendChild(btn);
  });
  paymentMessage.textContent = '';
};

// Premium content payment simulation
premiumContentBtn.onclick = () => {
  contentArea.innerHTML = "";
  paymentMessage.style.color = 'black';
  paymentMessage.textContent = 'Redirecting to payment...';

  // Simulate payment with a confirm box
  setTimeout(() => {
    const paid = confirm('Pay ₹100 to access premium content?');
    if(paid){
      paymentMessage.style.color = 'green';
      paymentMessage.textContent = 'Payment successful! Opening premium content...';

      // Open premium PDF (replace with your own premium content URL)
      window.open('https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', '_blank');
    } else {
      paymentMessage.style.color = 'red';
      paymentMessage.textContent = 'Payment cancelled.';
    }
  }, 1000);
};
