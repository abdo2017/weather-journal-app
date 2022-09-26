/* Global Variables */
const apikey = "9363d46e33da7295be15f6bc0987b89e";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
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
  try {
    // sending data
    await fetch("/sendData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  } catch (err) {
    console.log(err);
  }
  // getting the data
  fetch("/getData")
    .then((res) => res.json())
    .then((data) => {
      date.innerHTML = "Date: " + data.date;
      temp.innerHTML =
        `Temp in Celsius: ${data.temp}C`;
      content.innerHTML = "you feel " + data.content;
    });
});

const getWeatherData = async (url, zip, api) => {
  const fullUrl = `${url}?zip=${zip}&units=metric&appid=${api}`;
  try {
    let result = await fetch(fullUrl);
    const data = await result.json();
    return data;
    // return result;
  } catch (err) {
    console.log(err);
  }
};
