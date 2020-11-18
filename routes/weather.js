const router = require('express').Router()
const fetch = require('node-fetch')
const moment = require('moment')
const date = require('../public/js/date')



require('dotenv').config()
// console.log(arguments)
// console.log(require('module').wrapper)


let day;

router.get('/', (req, res) => {
 
   day = date.getDate()
  

  res.render('index', {
    day,
    city: null,
    des: null,
    icon: null,
    temp: null,
    wind: null,
    humidity: null,
    forecastDate1: null,
    forecastDate2: null,
    forecastDate3: null,
    forecastDate4: null,
    forecastDate5: null,
    forecastDate6: null,
    icon1: null,
    icon2: null,
    icon3: null,
    icon4: null,
    icon5: null,
    temp1: null,
    temp2: null,
    temp3: null,
    temp4: null,
    temp5: null,
    des1: null,
    des2: null,
    des3: null,
    des4: null,
    des5: null
  })
})

router.post('/', async (req, res) => {
  const city = req.body.city
  const urlApi = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${process.env.apiKey}&cnt=48`

  try {
    await fetch(urlApi)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if(data.message === "city not found") {
          // console.log(data)
         res.render('index', {
            city: data.message,
            day,
            des: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null,
            forecastDate1: null,
            forecastDate2: null,
            forecastDate3: null,
            forecastDate4: null,
            forecastDate5: null,
            icon1: null,
            icon2: null,
            icon3: null,
            icon4: null,
            icon5: null,
            temp1: null,
            temp2: null,
            temp3: null,
            temp4: null,
            temp5: null,
            des1: null,
            des2: null,
            des3: null,
            des4: null,
            des5: null
          })
          
        } else {
          const city = data.city.name
          const temp = Math.round(data.list[0].main.temp) + " °F"
          const des = data.list[0].weather[0].description
          const icon = data.list[0].weather[0].icon
          const humidity = data.list[0].main.humidity
          const wind = data.list[0].wind.speed

          // ForecastDates
          let fData = data.list.filter(el => el.dt_txt.includes('12:00:00')).map(d => {
            return d.dt_txt     
        })
        arr = []
        fData.forEach(d => {
            let forecast = moment(d).format("dddd, MMMM Do YYYY")
            arr.push(forecast)
            return arr
          })
          let forecastDate1 = arr[0]
          let forecastDate2 = arr[1]
          let forecastDate3 = arr[2]
          let forecastDate4 = arr[3]
          let forecastDate5 = arr[4]

          
          // ForecastIcons
          let fIcon = data.list.filter(e => e.dt_txt.includes('12:00:00') && e.weather[0].icon).map(day => {
            return day.weather[0].icon
                    
          })
          // console.log(fIcon)

          let icon1 = fIcon[0]
          let icon2 = fIcon[1]
          let icon3 = fIcon[2]
          let icon4 = fIcon[3]
          let icon5 = fIcon[4]

          // ForecastTemp
          let fTemp = data.list.filter(e => e.main.temp && e.dt_txt.includes('12:00:00')).map(day => {
            return Math.round(day.main.temp)
          })
          let temp1 = fTemp[0] + ' °F'
          let temp2 = fTemp[1] + ' °F'
          let temp3 = fTemp[2] + ' °F'
          let temp4 = fTemp[3] + ' °F'
          let temp5 = fTemp[4] + ' °F'

          // ForecastDescription
          let fDes = data.list.filter(e => e.dt_txt.includes('12:00:00') && e.weather[0].description).map(day => {
            return day.weather[0].description
          })
          let des1 = fDes[0]
          let des2 = fDes[1]
          let des3 = fDes[2]
          let des4 = fDes[3]
          let des5 = fDes[4]
    res.render('index', {
            day,
            city,
            des,
            temp,
            humidity,
            wind,
            icon,
            forecastDate1,
            forecastDate2,
            forecastDate3,
            forecastDate4,
            forecastDate5,
            icon1,
            icon2,
            icon3,
            icon4,
            icon5,
            temp1,
            temp2,
            temp3,
            temp4,
            temp5,
            des1,
            des2,
            des3,
            des4,
            des5
          })

        }
      })
  } catch (err) {
   
    res.render("index", {
      day,
      city: 'Something wrong',
      des: null,
      imageURL: null,
      temp: null,
      humidity: null,
      wind: null,
      forecastDate1: null,
      forecastDate2: null,
      forecastDate3: null,
      forecastDate4: null,
      forecastDate5: null,
      icon1: null,
      icon2: null,
      icon3: null,
      icon4: null,
      icon5: null,
      temp1: null,
      temp2: null,
      temp3: null,
      temp4: null,
      temp5: null,
      des1: null,
      des2: null,
      des3: null,
      des4: null,
      des5: null

    })

  }
})

module.exports = router