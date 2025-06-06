// User data key
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

// Free content data: Subjects → Units → PDFs
const freeContentData = {
  "Chemistry": {
    "Unit 1": [
      {name: "Chemistry Unit 1 - PDF 1", url: "free-content/chemistry/unit1/pdf1.pdf"},
      {name: "Chemistry Unit 1 - PDF 2", url: "free-content/chemistry/unit1/pdf2.pdf"},
      {name: "Chemistry Unit 1 - PDF 3", url: "free-content/chemistry/unit1/pdf3.pdf"},
      {name: "Chemistry Unit 1 - PDF 4", url: "free-content/chemistry/unit1/pdf4.pdf"},
      {name: "Chemistry Unit 1 - PDF 5", url: "free-content/chemistry/unit1/pdf5.pdf"}
    ],
    "Unit 2": [
      {name: "Chemistry Unit 2 - PDF 1", url: "free-content/chemistry/unit2/pdf1.pdf"},
      {name: "Chemistry Unit 2 - PDF 2", url: "free-content/chemistry/unit2/pdf2.pdf"},
      {name: "Chemistry Unit 2 - PDF 3", url: "free-content/chemistry/unit2/pdf3.pdf"},
      {name: "Chemistry Unit 2 - PDF 4", url: "free-content/chemistry/unit2/pdf4.pdf"},
      {name: "Chemistry Unit 2 - PDF 5", url: "free-content/chemistry/unit2/pdf5.pdf"}
    ],
    "Unit 3": [
      {name: "Chemistry Unit 3 - PDF 1", url: "free-content/chemistry/unit3/pdf1.pdf"},
      {name: "Chemistry Unit 3 - PDF 2", url: "free-content/chemistry/unit3/pdf2.pdf"},
      {name: "Chemistry Unit 3 - PDF 3", url: "free-content/chemistry/unit3/pdf3.pdf"},
      {name: "Chemistry Unit 3 - PDF 4", url: "free-content/chemistry/unit3/pdf4.pdf"},
      {name: "Chemistry Unit 3 - PDF 5", url: "free-content/chemistry/unit3/pdf5.pdf"}
    ],
    "Unit 4": [
      {name: "Chemistry Unit 4 - PDF 1", url: "free-content/chemistry/unit4/pdf1.pdf"},
      {name: "Chemistry Unit 4 - PDF 2", url: "free-content/chemistry/unit4/pdf2.pdf"},
      {name: "Chemistry Unit 4 - PDF 3", url: "free-content/chemistry/unit4/pdf3.pdf"},
      {name: "Chemistry Unit 4 - PDF 4", url: "free-content/chemistry/unit4/pdf4.pdf"},
      {name: "Chemistry Unit 4 - PDF 5", url: "free-content/chemistry/unit4/pdf5.pdf"}
    ],
    "Unit 5": [
      {name: "Chemistry Unit 5 - PDF 1", url: "free-content/chemistry/unit5/pdf1.pdf"},
      {name: "Chemistry Unit 5 - PDF 2", url: "free-content/chemistry/unit5/pdf2.pdf"},
      {name: "Chemistry Unit 5 - PDF 3", url: "free-content/chemistry/unit5/pdf3.pdf"},
      {name: "Chemistry Unit 5 - PDF 4", url: "free-content/chemistry/unit5/pdf4.pdf"},
      {name: "Chemistry Unit 5 - PDF 5", url: "free-content/chemistry/unit5/pdf5.pdf"}
    ],
  },
  "Physics": {
    "Unit 1": [
      {name: "Physics Unit 1 - PDF 1", url: "free-content/physics/unit1/pdf1.pdf"},
      {name: "Physics Unit 1 - PDF 2", url: "free-content/physics/unit1/pdf2.pdf"},
      {name: "Physics Unit 1 - PDF 3", url: "free-content/physics/unit1/pdf3.pdf"},
      {name: "Physics Unit 1 - PDF 4", url: "free-content/physics/unit1/pdf4.pdf"},
      {name: "Physics Unit 1 - PDF 5", url: "free-content/physics/unit1/pdf5.pdf"}
    ],
    "Unit 2": [
      {name: "Physics Unit 2 - PDF 1", url: "free-content/physics/unit2/pdf1.pdf"},
      {name: "Physics Unit 2 - PDF 2", url: "free-content/physics/unit2/pdf2.pdf"},
      {name: "Physics Unit 2 - PDF 3", url: "free-content/physics/unit2/pdf3.pdf"},
      {name: "Physics Unit 2 - PDF 4", url: "free-content/physics/unit2/pdf4.pdf"},
      {name: "Physics Unit 2 - PDF 5", url: "free-content/physics/unit2/pdf5.pdf"}
    ],
    "Unit 3": [
      {name: "Physics Unit 3 - PDF 1", url: "free-content/physics/unit3/pdf1.pdf"},
      {name: "Physics Unit 3 - PDF 2", url: "free-content/physics/unit3/pdf2.pdf"},
      {name: "Physics Unit 3 - PDF 3", url: "free-content/physics/unit3/pdf3.pdf"},
      {name: "Physics Unit 3 - PDF 4", url: "free-content/physics/unit3/pdf4.pdf"},
      {name: "Physics Unit 3 - PDF 5", url: "free-content/physics/unit3/pdf5.pdf"}
    ],
    "Unit 4": [
      {name: "Physics Unit 4 - PDF 1", url: "free-content/physics/unit4/pdf1.pdf"},
      {name: "Physics Unit 4 - PDF 2", url: "free-content/physics/unit4/pdf2.pdf"},
      {name: "Physics Unit 4 - PDF 3", url: "free-content/physics/unit4/pdf3.pdf"},
      {name: "Physics Unit 4 - PDF 4", url: "free-content/physics/unit4/pdf4.pdf"},
      {name: "Physics Unit 4 - PDF 5", url: "free-content/physics/unit4/pdf5.pdf"}
    ],
    "Unit 5": [
      {name: "Physics Unit 5 - PDF 1", url: "free-content/physics/unit5/pdf1.pdf"},
      {name: "Physics Unit 5 - PDF 2", url: "free-content/physics/unit5/pdf2.pdf"},
      {name: "Physics Unit 5 - PDF 3", url: "free-content/physics/unit5/pdf3.pdf"},
      {name: "Physics Unit 5 - PDF 4", url: "free-content/physics/unit5/pdf4.pdf"},
      {name: "Physics Unit 5 - PDF 5", url: "free-content/physics/unit5/pdf5.pdf"}
    ],
  },
  "Biology": {
    "Unit 1": [
      {name: "Biology Unit 1 - PDF 1", url: "free-content/biology/unit1/pdf1.pdf"},
      {name: "Biology Unit 1 - PDF 2", url: "free-content/biology/unit1/pdf2.pdf"},
      {name: "Biology Unit 1 - PDF 3", url: "free-content/biology/unit1/pdf3.pdf"},
      {name: "Biology Unit 1 - PDF 4", url: "free-content/biology/unit1/pdf4.pdf"},
      {name: "Biology Unit 1 - PDF 5", url: "free-content/biology/unit1/pdf5.pdf"}
    ],
    "Unit 2": [
      {name: "Biology Unit 2 - PDF 1", url: "free-content/biology/unit2/pdf1.pdf"},
      {name: "Biology Unit 2 - PDF 2", url: "free-content/biology/unit2/pdf2.pdf"},
      {name: "Biology Unit 2 - PDF 3", url: "free-content/biology/unit2/pdf3.pdf"},
      {name: "Biology Unit 2 - PDF 4", url: "free-content/biology/unit2/pdf4.pdf"},
      {name: "Biology Unit 2 - PDF 5", url: "free-content/biology/unit2/pdf5.pdf"}
    ],
    "Unit 3": [
      {name: "Biology Unit 3 - PDF 1", url: "free-content/biology/unit3/pdf1.pdf"},
      {name: "Biology Unit 3 - PDF 2", url: "free-content/biology/unit3/pdf2.pdf"},
      {name: "Biology Unit 3 - PDF 3", url: "free-content/biology/unit3/pdf3.pdf"},
      {name: "Biology Unit 3 - PDF 4", url: "free-content/biology/unit3/pdf4.pdf"},
      {name: "Biology Unit 3 - PDF 5", url: "free-content/biology/unit3/pdf5.pdf"}
    ],
    "Unit 4": [
      {name: "Biology Unit 4 - PDF 1", url: "free-content/biology/unit4/pdf1.pdf"},
      {name: "Biology Unit 4 - PDF 2", url: "free-content/biology/unit4/pdf2.pdf"},
      {name: "Biology Unit 4 - PDF 3", url: "free-content/biology/unit4/pdf3.pdf"},
      {name: "Biology Unit 4 - PDF 4", url: "free-content/biology/unit4/pdf4.pdf"},
      {name: "Biology Unit 4 - PDF 5", url: "free-content/biology/unit4/pdf5.pdf"}
    ],
    "Unit 5": [
      {name: "Biology Unit 5 - PDF 1", url: "free-content/biology/unit5/pdf1.pdf"},
      {name: "Biology Unit 5 - PDF 2", url: "free-content/biology/unit5/pdf2.pdf"},
      {name: "Biology Unit 5 - PDF 3", url: "free-content/biology/unit5/pdf3.pdf"},
      {name: "Biology Unit 5 - PDF 4", url: "free-content/biology/unit5/pdf4.pdf"},
      {name: "Biology Unit 5 - PDF 5", url: "free-content/biology/unit5/pdf5.pdf"}
    ],
  }
};

// Navigation variables
let currentLevel = 'subjects'; // 'subjects', 'units', 'pdfs'
let selectedSubject = null;
let selectedUnit = null;

// Show Register form
showRegister.onclick = () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  loginError.textContent = '';
  registerError.textContent = '';
};

// Show Login form
showLogin.onclick = () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  loginError.textContent = '';
  registerError.textContent = '';
};

// Register user
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
  users[email] = { password };
  localStorage.setItem(usersKey, JSON.stringify(users));
  alert('Registration successful! Please login.');
  showLogin.click();
};

// Login user
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

// Show main content after login
function showContentSection(){
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
  contentSection.style.display = 'block';
  paymentMessage.textContent = '';
  contentArea.innerHTML = '';
  currentLevel = 'subjects';
  selectedSubject = null;
  selectedUnit = null;
}

// Logout
logoutBtn.onclick = () => {
  loggedInUser = null;
  contentSection.style.display = 'none';
  loginForm.style.display = 'block';
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  contentArea.innerHTML = '';
  paymentMessage.textContent = '';
  currentLevel = 'subjects';
  selectedSubject = null;
  selectedUnit = null;
};

// Show Subjects on Free Content click
freeContentBtn.onclick = () => {
  paymentMessage.textContent = '';
  showSubjects();
};

// Show subject list
function showSubjects(){
  currentLevel = 'subjects';
  selectedSubject = null;
  selectedUnit = null;
  contentArea.innerHTML = "<h3>Free Subjects:</h3>";

  const subjects = Object.keys(freeContentData);

  subjects.forEach(subject => {
    const btn = document.createElement('button');
    btn.textContent = subject;
    btn.style.margin = '5px';
    btn.onclick = () => {
      showUnits(subject);
    };
    contentArea.appendChild(btn);
  });
}

// Show units of selected subject
function showUnits(subject){
  currentLevel = 'units';
  selectedSubject = subject;
  selectedUnit = null;

  contentArea.innerHTML = `<h3>${subject} - Units</h3>`;

  const backBtn = document.createElement('button');
  backBtn.textContent = '← Back to Subjects';
  backBtn.style.marginBottom = '10px';
  backBtn.onclick = () => {
    showSubjects();
  };
  contentArea.appendChild(backBtn);

  const units = Object.keys(freeContentData[subject]);

  units.forEach(unit => {
    const btn = document.createElement('button');
    btn.textContent = unit;
    btn.style.margin = '5px';
    btn.onclick = () => {
      showPdfs(subject, unit);
    };
    contentArea.appendChild(btn);
  });
}

// Show PDFs of selected unit
function showPdfs(subject, unit){
  currentLevel = 'pdfs';
  selectedUnit = unit;

  contentArea.innerHTML = `<h3>${subject} - ${
