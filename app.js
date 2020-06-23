//responsive navbar
const navBtn = document.querySelector(".navbar-burger");
const navMenu = document.querySelector(".navbar-menu");
navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("is-active");
  navMenu.classList.toggle("is-active");
});



//fetch city data from openweather
const data = async (city) => {
  const dataFetch =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherKey}`);
  return await dataFetch.json();
};

//fetch image
const imageData = async (city) => {
  const dataFetch = await fetch(`https://pixabay.com/api/?key=${pixaBayKey}&q=${city}&image_type=photo&pretty=true`)
    return await dataFetch.json();
};

//error message function
const errMsg = () => {
  const errMsg = document.querySelector(".cityErr");
  errMsg.classList.remove("is-hidden");
  setTimeout(() => {
    errMsg.classList.add("is-hidden");
  }, 2500);
};

//select buttons
const cityEntered = document.querySelector(".cityName");
const submitBtn = document.querySelector(".submitBtn");
const cardHolder = document.querySelector(".card");

//submit event
submitBtn.addEventListener("click",  async () => {
  const city = cityEntered.value;
  const weatherData = await data(city);
  const imgData = await imageData(city);
  if (weatherData.cod === "404"){
    errMsg();
  }else if (!city){
    errMsg();
  } else{
    cardHolder.innerHTML =`
                    <header class="card-header">
                        <p class="card-header-title">
                            ${weatherData.name}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src=${imgData.hits[0].largeImageURL} alt="img">
                            </figure>
                        </div>
                        <div class="content">
                            <table class="table">
                                <tr>
                                    <td>Current Temperature</td>
                                    <td><strong>${weatherData.main.temp} °С</strong></td>
                                </tr>
                                <tr>
                                    <td>Minimum Temperature</td>
                                    <td><strong>${weatherData.main.temp_min} °С</strong></td>
                                </tr>
                                <tr>
                                    <td>Maximum Temperature</td>
                                    <td><strong>${weatherData.main.temp_max} °С</strong></td>
                                </tr>
                                <tr>
                                    <td>Humidity</td>
                                    <td><strong>${weatherData.main.humidity}%</strong></td>
                                </tr>
                                <tr>
                                    <td>Sky</td>
                                    <td><strong>${weatherData.weather[0].description}</strong></td>
                                </tr>
                            </table>
                        </div>
                    </div>
  `;
  }
});
const pixaBayKey = "17172717-b019c6a33c2b5e7370880efaa";
const openWeatherKey = "97fc3552d0eaead441789ea0bd867726";