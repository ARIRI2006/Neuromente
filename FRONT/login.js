let button = document.querySelector("#button-avancar");

button.onclick = async function(event) {
  event.preventDefault()

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  let data = {email, password};

  const response = await fetch('http://localhost:3008/api/store/logintask', {
    method: "POST",
    headers: {"Content-type": "application/json;charset=UTF-8"},
    body: JSON.stringify(data)
  });
  
  let content = await response.json();
  
  if (content.success) {
    window.location.href = './home.html'
    localStorage.setItem('@conta_conectada', JSON.stringify(content.data));
    alert(content.message)
  } else {
    alert(content.message); 
  }  
}
