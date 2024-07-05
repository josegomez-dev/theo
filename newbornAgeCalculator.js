// Function to calculate and display age
function calculateAge(birthDate) {
  var today = new Date();
  var birthDate = new Date(birthDate);

  var age = {
    years: today.getFullYear() - birthDate.getFullYear(),
    months: today.getMonth() - birthDate.getMonth(),
    days: today.getDate() - birthDate.getDate(),
    hours: today.getHours() - birthDate.getHours(),
    minutes: today.getMinutes() - birthDate.getMinutes(),
    seconds: today.getSeconds() - birthDate.getSeconds(),
  };

  // Adjust negative values
  if (age.seconds < 0) {
    age.minutes--;
    age.seconds += 60;
  }
  if (age.minutes < 0) {
    age.hours--;
    age.minutes += 60;
  }
  if (age.hours < 0) {
    age.days--;
    age.hours += 24;
  }
  if (age.days < 0) {
    var prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    age.months--;
    age.days += prevMonthLastDay;
  }
  if (age.months < 0) {
    age.years--;
    age.months += 12;
  }

  return age;
}

// Function to update age display
function updateAgeDisplay(birthDate) {
  var age = calculateAge(birthDate);

  document.getElementById('age').innerText = '' + age.hours + ' horas ' + age.minutes + ' minutos y ' + age.seconds + ' segundos';
  document.getElementById('large-age').innerText = '' + age.days + ' dias ' + age.months + ' meses y ' + age.years + ' años';
}

// Example usage:
var birthDate = '2024-06-19'; // Replace with your birth date in 'YYYY-MM-DD' format

// Initial display update
updateAgeDisplay(birthDate);

// Update every second (1000 milliseconds)
setInterval(function() {
  updateAgeDisplay(birthDate);
}, 1000);
