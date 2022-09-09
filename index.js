const dogImg = document.getElementById("hero-img"); 
const prdctBtn = document.getElementById("predict");
const namebox = document.getElementById("name");
const results = document.getElementById("results");
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
prdctBtn.addEventListener('click', function(){predict(userName)});

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

//Turn Country ID into Nationality
async function getNationalityFull(country) {
	let response = await fetch(
		'https://restcountries.com/v3.1/alpha/'+country,
	);
    let data = await response.json();
    return data[0].demonyms.eng.m;
}

// Capitilize
function capitalize(str) {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
}

// Main Function
function predict(userName){
    if (!userName){
        window.confirm("Your Name cannot be empty...");
        return;
    }
    prdctBtn.innerText = "Predicting...";
    results.innerHTML = "";
    (async () => {
        userName = capitalize(userName);
        let gender = await getGender(userName);
        gender = capitalize(gender);
        let age = await getAge(userName);
        let nationality = await getNationality(userName);
        console.log(nationality)
        nationality.forEach((element,index) => {
            if (index < 2){
                (async () => {
                    let nationalityFull = await getNationalityFull(element.country_id);
                    let probability = Math.floor(element.probability*100)
                    results.innerHTML += '<div><h2>'+probability+'% Probability</h2><p>Name: '+userName+'</p><p>Nationality: '+nationalityFull+'</p><p>Gender: '+gender+'</p><p>Age: '+age+'</p></div>';
                })()
            }
        });
        prdctBtn.innerText = "Predict!"
    })();
}