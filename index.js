const dogImg = document.getElementById("hero-img"); 
fetch('https://dog.ceo/api/breeds/image/random')
  .then((response) => response.json())
  .then((data) => {
      dogImg.src = data.message
  });
