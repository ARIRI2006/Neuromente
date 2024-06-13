const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");

function validatePassword() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("As senhas não coincidem");
  } else {
    confirmPassword.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

let button = document.getElementById("button-avancar");

button.onclick = async function(event) {
  event.preventDefault()
  validatePassword();

  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem!");
    return;
  }

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let passwordValue = document.getElementById("password").value;

  let data = {name, email, password: passwordValue};

  const response = await fetch('http://localhost:3003/api/store/task', {
    method: "POST",
    headers: {"Content-type": "application/json;charset=UTF-8"},
    body: JSON.stringify(data)
  });

  let content = await response.json();

  if (content.success) {
    alert(content.message);
    window.location.href = 'login.html'
  } else {
    alert(content.message);
  }
}