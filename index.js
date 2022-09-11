const mainDiv = document.getElementById("switch-div");
let user, pass;

logInPage();
// LogIn Page Init
function logInPage(){
    //Insert Page HTML
    mainDiv.innerHTML = '<div class="main-container margin"><div><input type="text" class="signin-input" name="user" id="user" placeholder="Username"><input type="password" class="signin-input" name="pass" id="pass" placeholder="Password"></div><button id="signin">Sign In</button><p>You dont have an account? <span id="signup">Create one now!</span></p><div id="end"></div></div>'

    // get Username and Password value
    document.getElementById("user").addEventListener('input', function(event){user = event.target.value})
    document.getElementById("pass").addEventListener('input', function(event){pass = event.target.value})

    //Button Event Listeners
    document.getElementById("signin").addEventListener('click', signIn)
    document.getElementById("signup").addEventListener('click', signUp)
}

function signIn(){
    if(localStorage.getItem(user) == pass){
        document.getElementById("end").innerHTML = '<p class="success">You have logged in successfully, please wait till you are redirected...</p>'
        document.getElementById("signin").removeEventListener('click', signIn)
        document.getElementById("signup").removeEventListener('click', signUp)
        setTimeout(() => {
            mainSite();
        }, 3000);
    }
    else{
        document.getElementById("end").innerHTML = '<p class="fail">Your username or password are incorrect.</p>'
    }
}

function signUp(){
    //Sign up page HTML
    mainDiv.innerHTML = '<div class="main-container margin"><h3>Create your Account!</h3><div><input type="text" class="signin-input" name="user" id="user" placeholder="Username"><input type="password" class="signin-input" name="pass" id="pass" placeholder="Password"></div><button id="signin">Sign Up</button></div><div id="end"></div></div>'
    document.getElementById("user").addEventListener('input', function(event){user = event.target.value})
    document.getElementById("pass").addEventListener('input', function(event){pass = event.target.value})
    document.getElementById("signin").addEventListener('click', credChecker)
    function credChecker(){
        //Check if any inputs are empty (I have not excluded spaces)
        if (!user || !pass){
            document.getElementById("end").innerHTML = '<p class="fail">Your username or password cannot be empty.</p>'
            return;
        }
        //Check if user already exists
        else if(localStorage.getItem(user)){
            document.getElementById("end").innerHTML = '<p class="fail">User already exists</p>'
            return;
        }
        document.getElementById("signin").removeEventListener('click', credChecker)
        localStorage.setItem(user, pass);
        document.getElementById("end").innerHTML = '<p class="success">Your account has been created successfully, please wait 5 seconds to be redirected...</p>'
        setTimeout(() => {
            logInPage();
        }, 5000)
    }
}    

function  mainSite(){
    (async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random')
            const data = await response.json()
            mainDiv.innerHTML = '<img id="hero-img" src="'+data.message+'" alt="Dog Image"><br>'
            mainDiv.insertAdjacentHTML('beforeend', '<div><label for="name">Enter your Name: </label><input type="text" id="name" name="name" placeholder="Your Name"> <button class="btn" id="predict">Predict!</button></div><div class="results" id="results"></div>')
        } catch (error) {
            console.log("error")
        }

        // Settings my Const
        const prdctBtn = document.getElementById("predict");
        const namebox = document.getElementById("name");
        const results = document.getElementById("results");

        // Detecting username
        let userName;
        namebox.addEventListener('input', function(event){
            userName = event.target.value;
        });

        // Event listener for button click
        prdctBtn.addEventListener('click', function(){predict(userName)});

        // Main Function, gets called on click
        function predict(userName){
            if (!userName || hasNumber(userName)){
                window.confirm("Your Name cannot be empty and can't contain numbers...");
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

        // Capitilize Function
        function capitalize(str) {

            // converting first letter to uppercase
            const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

            return capitalized;
        }

        //Check if str has a number or spaces
        function hasNumber(str) {
            return /[0-9 ]+/.test(str)
        }
    })();
}