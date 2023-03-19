const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const email = document.querySelector("#email").value;

  console.log(`Name: ${name}, Surname: ${surname}, Email: ${email}`);
  alert("Thank you for subscribing!");
});
