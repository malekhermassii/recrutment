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
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <form>
                    <h1>${pageTitle}</h1>
                    <textarea style="height: 180px;" id="page-content"></textarea>
                    <button id="save-btn">Save</button>
                </form>
               
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
