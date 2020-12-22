const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const mainText = document.getElementById('main')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')


const cityInput= document.getElementById('city-input')
const historyElm = document.getElementById('history')
const masterHistory = document.getElementById('master-history')


const API_KEY = '05e136c591a0337c46c6d594fedb8eef'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${API_KEY}`
const ICON_URL = 'http://openweathermap.org/img/wn/' 
const DEFAULT_CITY = 'khulna,bd'

//access the location from the user
window.onload = ()=>{
    navigator.geolocation.getCurrentPosition(s=>{
        // console.log(s)
       getWeatherData(null,s.coords)
    },e=>{
        // console.log(e)
        getWeatherData()
    })

    axios.get('/api')
      .then(({data})=>{
          if(data.length>0){
                updateHistory(data)
          }else{
              historyElm.innerHTML = 'There is no data still now'
          }
      })
        .catch(e=>{
            console.log(e)
            alert('error occured')
        })

    cityInput.addEventListener('keypress',function(e){
        if(e.key === 'Enter'){
            if(e.target.value){
                getWeatherData(e.target.value,null,weather=>{
                    e.target.value = ''

                    axios.post('/api',weather)
                    .then(({data})=>updateHistory(data))
                    .catch(e=>{
                        console.log(e)
                        alert('error occured')
                    })
                })
            }
            else{
                alert('please provide a valid city name')
        }
        }
    })
}

//working with function
//users can allow or block if user do block then it will automatically take the default city otherwise take the given data by th user 
function getWeatherData(city = DEFAULT_CITY,coords,cb){
    let url = BASE_URL
    city == null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`:
        url = `${url}&q=${city}`

    // console.log(url)
    //push request to the axios
    axios.get(url)
    .then(({data})=>{
        // console.log(response)
        let weather = {
            icon:data.weather[0].icon,
            name:data.name,
            country:data.sys.country,
            main:data.weather[0].main,
            description:data.weather[0].description,
            temp:data.main.temp,
            pressure:data.main.pressure,
            humidity:data.main.humidity

        }
        setWeather(weather)
        if(cb) cb(weather)
    })
    .catch(e=>{
        console.log(e)
        alert('city not found')
    })
}
function setWeather(weather){
    condition.src = `${ICON_URL}${weather.icon}.png`
    city.innerHTML = weather.name
    country.innerHTML = weather.country
    mainText.innerHTML  = weather.main
    description.innerHTML = weather.description
    // degree  = weather.temp
    // temp.innerHTML = degree-273.15
    temp.innerHTML = weather.temp+'&#8451';
    pressure.innerHTML = weather.pressure
    humidity.innerHTML = weather.humidity

}

function updateHistory(history){
    historyElm.innerHTML = ''
    history = history.reverse()


    history.forEach(h=>{
        let tempHistory = masterHistory.cloneNode(true)
        tempHistory.id = ''
        tempHistory.getElementsByClassName('condition')[0].src = `${ICON_URL}${h.icon}.png`
        tempHistory.getElementsByClassName('city')[0].innerHTML = h.name
        tempHistory.getElementsByClassName('country')[0].innerHTML = h.country
        tempHistory.getElementsByClassName('main')[0].innerHTML = h.main
        tempHistory.getElementsByClassName('description')[0].innerHTML = h.description
        tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp
        tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure
        tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity

        historyElm.appendChild(tempHistory)
    })
}

