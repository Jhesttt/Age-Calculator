document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('age-form');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission
      validateForm();
    });
  });

  function validateForm() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
  
    const dayError = document.getElementById('dayError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');

    let errors = [];

    if (!day || !month || !year) {
        errors.push('All fields are required.');
    }


    // Check if day is between 1 and 31
    if (day < 1 || day > 31) {
      errors.push('Day must be between 1 and 31.');
    }
  
    // Check if month is between 1 and 12
    if (month < 1 || month > 12) {
      errors.push('Month must be between 1 and 12.');
    }
  
    // Check if date is valid
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
      errors.push('Invalid date.');
    }
  
    // Check if date is in the future
    const today = new Date();
    if (date > today) {
      errors.push('Date cannot be in the future.');
    }
  
    if (errors.length > 0) {
      console.log(errors);
      errors.forEach(err => {
        const ul = document.getElementById('errList');
        console.log(ul.innerHTML);
        const li = document.createElement('li');
        li.textContent = err;
        ul.appendChild(li);
      });
      document.getElementById('popUp').classList.remove('disappear');
      document.getElementById('overlay').classList.remove('disappear');

      document.getElementById('btnClose').addEventListener('click',()=>{
        document.getElementById('popUp').classList.add('disappear');
        document.getElementById('overlay').classList.add('disappear');
        setTimeout (()=>{
            errors = [];
            document.getElementById('errList').innerHTML="";
        },150)
      })

      return;
    }

    



  
    calculateAge(date);
  }
  
  function calculateAge(birthDate) {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
  
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  
    displayAge(years, months, days);
  }
  
  function displayAge(years, months, days) {
    const day = document.getElementById('dayValue'); 
    const month = document.getElementById('monthValue');
    const year = document.getElementById('yearValue');
    
    day.textContent = days
    month.textContent = months
    year.textContent = years
  }
  
