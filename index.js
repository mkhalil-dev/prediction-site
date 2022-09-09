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

// Event listener for button click
prdctBtn.addEventListener('click', function(){getNationality(userName)});

// Get Nationality
let nationality;
async function getNationality(name) {
	const response = await fetch(
		'https://api.nationalize.io/?name='+name,
	);
    const data = await response.json()
    console.log(data.country)
}