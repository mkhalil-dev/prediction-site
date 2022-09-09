const dogImg = document.getElementById("hero-img"); 
const prdctBtn = document.getElementById("predict");
const namebox = document.getElementById("name");
let userName;

// fetching random dog image and replacing it
fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json())
  .then((data) => {
      dogImg.src = data.message
  });

// Detecting username
namebox.addEventListener('input', function(event){
    userName = event.target.value;
});

prdctBtn.addEventListener('click', function(){predict(userName)});

function predict(name) {
    console.log(name)
};