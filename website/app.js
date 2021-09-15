/* Global Variables */
const apikey = "9363d46e33da7295be15f6bc0987b89e";
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// dom manipulations
const generateButton = document.querySelector("button#generate");
// when click on the button

generateButton.addEventListener("click", async function buttonClick(e) {
  e.preventDefault();
  const zip = document.querySelector("#zip").value;
  const feelingContent = document.querySelector("#feelings").value;

  const date = document.querySelector("#date");
  const temp = document.querySelector("#temp");
  const content = document.querySelector("#content");

  // fetch weather
  const data = await getWeatherData(weatherUrl, zip, apikey);
  const newData = {
    date: newDate,
    temp: data.main.temp,
    content: feelingContent,
  };
  await fetch("/sendData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  const result = await fetch("/getData", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  result
    .json()
    .then((data) => {
      console.log(data)

      date.innerHTML = "Date: " + data.date;
      temp.innerHTML = "Temp in kelvin " + data.temp;
      content.innerHTML = "you feel " + data.content;
      console.log(date)
      console.log(temp)
      console.log(content)
    })
    .catch((err) => console.error(err));
});

const getWeatherData = async (url, zip, api) => {
  const fullUrl = `${url}?zip=${zip}&appid=${api}`;
  const result = await fetch(fullUrl);
  try {
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateSite = async () => {
  const result = await fetch("/getData", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const data = result.json();
    date.textContent = data.date;
    temp.textContent = data.temp;
    content.textContent = data.content;
  } catch (err) {
    console.log(err);
  }
};
