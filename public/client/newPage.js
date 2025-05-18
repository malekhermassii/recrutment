//add new skills

const skillsContainer = document.getElementById('skills-container');
const addSkillBtn = document.getElementById('add-skill-btn');
const skillsForm = document.getElementById('skills-form');
let skillCount = 3;

// Add a new skill input field
function addSkillInput() {
    skillCount++;
    const newSkillInput = document.createElement('div');
    newSkillInput.className = 'skill-input';
    newSkillInput.innerHTML = `
        <label for="skill-${skillCount}">Skill ${skillCount}:</label>
        <input type="text" id="skill-${skillCount}" name="skill-${skillCount}">
    `;
    skillsContainer.appendChild(newSkillInput);
}

// Add event listener to the add skill button
addSkillBtn.addEventListener('click', addSkillInput);

// Save the skills to local storage
skillsForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const skillInputs = document.querySelectorAll('[id^=skill]');
    const skills = [];
    skillInputs.forEach(function(input) {
        skills.push(input.value);
    });
    localStorage.setItem('skills', JSON.stringify(skills));
    alert('Skills saved!');
    // Redirect to the next page
    window.location.href = 'resume.html';
});
// Create a new HTML page with a textarea when the "Create New Page" button is clicked
const newPageBtn = document.getElementById('new-page-btn');
newPageBtn.addEventListener('click', function() {
    const pageTitle = prompt("Enter a title for the new page:");
    if (pageTitle) {
        const newPage = window.open("", pageTitle);
        newPage.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${pageTitle}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
                <script src="https://kit.fontawesome.com/0e035b9984.js" crossorigin="anonymous"></script>
                <script src="https://kit.fontawesome.com/0e035b9984.js" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="css/main.css">
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
            <nav class="navbar navbar-expand-xl fixed-top ">
            <div class="container">
              <a class="navbar-brand" href="index.html"><img claass="w-100" src="img/icon/company-logo.svg" alt=""></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-card-item">
                    <a class="nav-link  active" href="index.html">Home</a>
                  </li>
                  <li class="nav-card-item">
                    <a class="nav-link" href="offers.html">Offers</a>
                  </li> 
                  <li class="nav-card-item">
                    <a class="nav-link" href="blog.html">Blog</a>
                  </li>     
                  <li class="nav-card-item">
                    <a class="nav-link" href="aboutus.html">About</a>
                  </li> 
                  <li class="nav-card-item">
                    <a class="nav-link" href="contact.html">Contact</a>
                  </li>
                </ul>
                <ul class="right navbar-nav ms-auto">
                  <li class="nav-card-item-right create-account">
                    <a class="nav-link" href="register.html">Create account</a>
                  </li>   
                </ul>
              </div>
            </div>
          </nav>
          <h1>${pageTitle}</h1>
                <form class="form">
                    
                    <textarea style="height: 180px;" id="page-content"></textarea>
                    <button id="save-btn">Save</button>
                </form>
                <footer>
      <div class="container text-center text-md-start">
        <div class="footer-wrap">
          <div class="about">
            <img src="img/icon/company-logo.svg" alt="">
            <p class="text-muted py-4">
              Start working with us which can provide you with all the tools needed to run an effcieint business remotely.
            </p>
            <div class="social-media">
              <a href="" class="me-2 text-reset"><img src="img/icon/facebook-icon.svg" alt=""></a>
              <a href="" class="me-2 text-reset"><img src="img/icon/twitter-icon.svg" alt=""></a>
              <a href="" class="me-2 text-reset"><img src="img/icon/linkedin-icon.svg" alt=""></a>
              <a href="" class="me-2 text-reset"><img src="img/icon/instagram-icon.svg" alt=""></a>
            </div>
          </div>

          <div class="company">
            <h6 class="fw-bold">Company</h6>
            <p><a href="offers.html">Offers</a></p>
            <p><a href="personal-info.html">Resume</a></p>
            <p><a href="blog.html">Blog</a></p>
            <p><a href="">Login</a></p>
          </div>
          
          <div class="useful-links">
            <h6 class="fw-bold">Useful links</h6>
            <p><a href="aboutus.html">About us</a></p>
            <p><a href="contact.html">Contact</a></p>
            <p><a href="policies.html">Privacy Policy</a></p>
          </div>

          <div class="newsletter">
            <h6 class="fw-bold">Newsletter</h6>
            <p class="text-muted">Sign up and receive the latest tips
              via email.</p>
              <form id="subscribe" action="">
                <label for="email">Youre e-mail:</label>
                <input type="email" placeholder="e-mail:" name="email" required>
                <button type="submit" class="main-btn">Subscribe</button>
              </form>
          </div>
          
        </div>
      </div>
    
  </footer>
                <script>
                    const saveBtn = document.getElementById('save-btn');
                    saveBtn.addEventListener('click', function() {
                        const content = document.getElementById('page-content').value;
                        const pagesData = JSON.parse(localStorage.getItem('pagesData')) || [];
                        const newPageData = { title: "${pageTitle}", content: content };
                        pagesData.push(newPageData);
                        localStorage.setItem('pagesData', JSON.stringify(pagesData));
                        // Redirect to the next page
                        window.location.href = 'resume.html';
                    });
                </script>
            </body>
            </html>
        `);
    }
});
