const $ajustesBtn = document.querySelector(".fa-gear");
const $appView = document.querySelector(".app");
const $ajustesOptionBtn = document.querySelectorAll(".ajustes-option");
const $div1 = document.querySelector(".backgroundDiv1");
const $div2 = document.querySelector(".backgroundDiv2");
const $inputSearchCity = document.querySelector(".search");
const $gradosData = document.querySelector(".mostrar-grados");
const $locationCity = document.querySelector(".location");
const $fahrenheit = document.querySelector(".fahrenheit");
const $humedad = document.querySelector(".humedad")
const $viento = document.querySelector(".viento")
const $termica = document.querySelector(".termica")

$inputSearchCity.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const city = $inputSearchCity.value;
    getWeatherData(city);
  }

  $inputSearchCity.Value = "";
});
$ajustesBtn.addEventListener("click", () => {
  pestañaAjustes();
});

function pestañaAjustes() {
  const $back = document.createElement("i");
  $back.innerHTML = `<i class="fa-solid fa-gear active"></i>Settings`;
  const view = document.createElement("div");
  view.appendChild($back);
  $back.addEventListener("click", () => {
    view.remove();
  });
  view.classList.toggle("ajustes-active");
  $appView.appendChild(view);
  const $ajustesOption = document.createElement("");
  $ajustesOption.classList.add("ajustes-option");
  $ajustesOption.innerText = "Desactivar Colorimetria";
  $ajustesOption.addEventListener("active", () => {
    desactivarColorimetria();
  });
  view.appendChild($ajustesOption);
}

function controladorDeCalor(grados) {
  function clear() {
    $appView.classList.remove("soleado");
    $div1.classList.remove("soleadoDiv1");
    $div2.classList.remove("soleadoDiv2");
  }
  clear();

  if (grados > 25) {
    $appView.classList.add("soleado");
    $div1.classList.add("soleadoDiv1");
    $div2.classList.add("soleadoDiv2");
  }
}

function cambiarImagenDelClima(grados) {
  const img = document.getElementById("imageClima");
  if (img) {
    if (grados <= 15) {
      img.style.backgroundImage =
        "url(iconsIMG/weather-icons-bqra/weather-icons-bqra/weather-icons-png/FreezingDrizzle.png)";
    } else if (grados >= 16 && grados <= 20) {
      img.style.backgroundImage =
        "url(iconsIMG/weather-icons-bqra/weather-icons-bqra/weather-icons-png/Cloudy.png)";
    } else if (grados <= 25) {
      img.style.backgroundImage =
        "url(iconsIMG/weather-icons-bqra/weather-icons-bqra/weather-icons-png/PartlyCloudyDay.png)";
    } else {
      img.style.backgroundImage =
        "url(iconsIMG/weather-icons-bqra/weather-icons-bqra/weather-icons-png/Sunny.png)";
    }
  } else {
    console.error("Image element with ID 'imageClima' not found!");
  }
}

function desactivarColorimetria() {
  $appView.classList.toggle("darkmode");
  $div1.classList.toggle("darkmodeDiv1");
  $div2.classList.toggle("darkmodeDiv2");

  return true;
}

async function getWeatherData(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "43624f5070msh279c8a63ddad122p132219jsn859dad5d97f7",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const temperatureC = result.current.temp_c;
    const ciudad = result.location.name;
    const region = result.location.region;
    const pais = result.location.country;
    const fahrenheit = result.current.temp_f;
    const termicaC = result.current.feelslike_c;
    const termicaF = result.current.feelslike_f;
    const humedad = result.current.humidity;
    const viento = result.current.wind_kph;
    actualizarMoreInfo(termicaC, termicaF, humedad, viento)
    controladorDeCalor(temperatureC);
    cambiarImagenDelClima(temperatureC);
    actualizarTemperatura(temperatureC, ciudad, region, pais, fahrenheit);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function actualizarTemperatura(grados, ciudad, region, pais, fahrenheit) {
  $gradosData.innerText = `${grados}°C`;
  $locationCity.innerText = `${ciudad}, ${region}, ${pais}`;
  $fahrenheit.innerText = ` ${fahrenheit}°F`;
}

function actualizarMoreInfo(c,f,humedad,viento){
    $humedad.innerText = `Humedad: ${humedad}%`;
    $termica.innerText = `Sensación térmica: ${c}°C ${f}°F`;
    $viento.innerText = `Velocidad del viento: ${viento} kph`;

}
