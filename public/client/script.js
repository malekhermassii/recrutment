const form = document.querySelector('form');
const resume = document.querySelector('#resume');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = form.querySelector('#name').value;
  const email = form.querySelector('#email').value;
  const phone = form.querySelector('#phone').value;
  const address = form.querySelector('#address').value;
  const degree = form.querySelector('#degree').value;
  const institution = form.querySelector('#institution').value;
  const graduationDate = form.querySelector('#graduation-date').value;
  const position = form.querySelector('#position').value;
  const company = form.querySelector('#company').value;
  const startDate = form.querySelector('#start-date').value;
  const endDate = form.querySelector('#end-date').value;
  const responsibilities = form.querySelector('#responsibilities').value;
  
  const html = `
    <h1>${name}</h1>
    <p>Email: ${email} | Phone: ${phone} | Address: ${address}</p>
    
    <h2>Education</h2>
    <h3>${degree}</h3>
    <p>${institution} | Graduation Date: ${graduationDate}</p>
    
    <h2>Work Experience</h2>
    <h3>${position}</h3>
    <p>${company} | ${startDate} - ${endDate}</p>
    <p>${responsibilities}</p>
  `;
  
  resume.innerHTML = html;
  resume.style.display = 'block';
});
