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
async function getNationality(name) {
	let response = await fetch(
		'https://api.nationalize.io/?name='+name,
	);
    let data = await response.json();
    return (await data.country);
}

// Get Age
async function getAge(name) {
	let response = await fetch(
		'https://api.agify.io/?name='+name,
	);
    let data = await response.json();
    return (await data.age);
}

// Get Gender
async function getGender(name) {
	let response = await fetch(
		'https://api.genderize.io?name='+name,
	);
    let data = await response.json();
    return (await data.gender);
}
(async () => {
    let gender = await getGender("Mohamad");
    let age = await getAge("Mohamad");
    let nationality = await getNationality("Mohamad");
    nationality.forEach((element,index) => {
        if (index < 2){
        console.log(element,index)
        }
    });
  })()