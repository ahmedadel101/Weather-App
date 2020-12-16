/* Global Variables */
const apiKey = 'abfdb6607d48d78c9bc9e74abfa87f0e&units=imperial';

let zipCode = document.getElementById('zip')
let feeling = document.getElementById('feelings')
let formSubmitWeather = document.getElementById('submitForm');


// Sumbit form ..
formSubmitWeather.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new date instance dynamically with JS
    let newDate = new Date();
    let objData = {
        zipCode: zipCode.value,
        feeling: feeling.value,
    };

    // All Api Information
    // Get Api Weather App With My api Key
    const apiInformation = async function() {
        await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${objData.zipCode},us&appid=${apiKey}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(data => {
                
                
                let objPost = {
                    temp: data.main.temp,
                    date: newDate,
                    feeling: objData.feeling
                }

                postAndGetData(objPost);
               
            })
            .catch(err => console.log("err", err))
    }
    apiInformation();
    // Post Data in server 


})



function postAndGetData(obj){

     // Post Data to server.js
     const addData = async function() {
        return await fetch(`http://localhost:8000/postData`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(data => console.log(data))

    }
    
    // Get Data from server.js
    const getData = async function() {
        let showData = []
        return await fetch(`http://localhost:8000/getData`)
            .then(res => res.json())
            .then(data => {
                let sliceDate = `${data.date}`;
                let liveDate = sliceDate.slice(0,10);
                showData += `
                    <div class="data">
                    <div > Date : <i class="far fa-calendar-alt"></i> ${liveDate}</div>
                    <div > Temperature : <i class="fas fa-cloud-sun"></i> ${data.temp}</div>
                    <div > My Feeling : ${data.feeling}</div>
                    </div>
                `
                document.getElementById('entryHolder').innerHTML = showData
            })
            .catch(err => console.log("err", err))
    }

    addData();
    getData();
}

