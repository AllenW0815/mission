// API
const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-0A4AAE63-1212-4C3D-9C26-AD82E6CDE2A2&elementName=MaxAT,PoP12h,T,RH,Wx'
const url2 = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-0A4AAE63-1212-4C3D-9C26-AD82E6CDE2A2&elementName='

// DOM
const select = document.querySelector('#select')
const today = document.querySelector('.today')
const cards = document.querySelector('.cards')

// static data
let latestData = null


// AJAX 取資料
const getDateAJAX = () => {
    fetch(url)
    .then((res)=>{
       return res.json()
    })
    .then((result)=>{
        console.log(result);
        let data = result.records.locations[0].location
        latestData = [...data]
        let cityIndex = 0
        let city =  null
        let time = null
        let temperature = null
        let weather = null
        let bodyTemperature = null
        let rainProbability = null
        let humidity = null

        let display = ''

        setOption(data,cityIndex)
    })
}

// 設定 select 的 option
const setOption = (data,cityIndex) =>{
    let display = ''
    for(let i = 0 ; i < data.length ; i++){
        display += 
        `
        <option value="${i}">${data[i].locationName}</option>
        `      
    }
    select.innerHTML = display
    console.log(cityIndex);
    console.log(data);
    changeCity(data,cityIndex)
}

// 更換 city 觸發
const changeCity = (cityIndex) =>{
    console.log(latestData);
    cityIndex = select.value
    showCards(latestData,cityIndex)
    showMainCard(latestData,cityIndex)
    // return value
}
select.addEventListener('change', changeCity)

// 資料處理
const timeHandler = (unhandleData) =>{
    // 這邊只剩下時間 15 筆
    // console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[0].time.length; i+=2) {
        result.push((unhandleData.weatherElement[0].time[i].startTime).slice(0,11))       
    }
    // console.log(result);
    return result
}
const temperatureHandler = (unhandleData) =>{
    // console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[1].time.length; i+=2) {
        result.push(unhandleData.weatherElement[1].time[i].elementValue[0].value)       
    }
    // console.log(result);
    return result
}
const weatherHandler = (unhandleData) =>{
    // console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[4].time.length; i+=2) {
        result.push(unhandleData.weatherElement[4].time[i].elementValue[0].value)       
    }
    // console.log(result);
    return result
}
const bodyTemperatureHandler = (unhandleData) =>{
    // console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[3].time.length; i+=2) {
        result.push(unhandleData.weatherElement[3].time[i].elementValue[0].value)       
    }
    // console.log(result);
    return result
}
const rainProbabilityHandler = (unhandleData) =>{
    // console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[0].time.length; i+=2) {
        result.push(unhandleData.weatherElement[0].time[i].elementValue[0].value)       
    }
    // console.log(result);
    return result
}
const humidityHandler = (unhandleData) =>{
    // console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[2].time.length; i+=2) {
        result.push(unhandleData.weatherElement[2].time[i].elementValue[0].value)       
    }
    // console.log(result);
    return result
}

// 生成 main-card
const showMainCard = (data,cityIndex) =>{
    let display = ''
    let unhandleData = data[cityIndex]
    locationName = unhandleData.locationName
    time = unhandleData.weatherElement[0].time[0].startTime
    timeConvert = time.slice(0,11)
    temperature = unhandleData.weatherElement[1].time[0].elementValue[0].value
    weather = unhandleData.weatherElement[4].time[0].elementValue[0].value
    bodyTemperature = unhandleData.weatherElement[3].time[0].elementValue[0].value
    rainProbability = unhandleData.weatherElement[0].time[0].elementValue[0].value
    humidity = unhandleData.weatherElement[2].time[0].elementValue[0].value

    display += 
    `
    <h2>${locationName}</h2>
    <h3>${timeConvert}</h3>
    <div class="weather-temp">
    <img src="img/資產 1.png" alt="" />
    <h3>${temperature}°C</h3>
    </div>
    <div class="info">
    <table>
        <thead>
        <tr>
            <th colspan="2">天氣資訊</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>天氣現象</td>
            <td>${weather}</td>
        </tr>
        <tr>
            <td>體感溫度</td>
            <td>${bodyTemperature}°C</td>
        </tr>
        <tr>
            <td>降雨機率</td>
            <td>${rainProbability}%</td>
        </tr>
        <tr>
            <td>相對溼度</td>
            <td>${humidity}%</td>
        </tr>
        </tbody>
    </table>
    `
    
    today.innerHTML = display
} 

// 生成 cards
const showCards = (data,cityIndex) =>{
    console.log(data);
    console.log(cityIndex);
    let unhandleData = data[cityIndex]
    // 已在上一層宣告
    city = data[cityIndex].locationName
    console.log(city);
    time = timeHandler(unhandleData)
    temperature = temperatureHandler(unhandleData)
    weather = weatherHandler(unhandleData)
    bodyTemperature = bodyTemperatureHandler(unhandleData)
    rainProbability = rainProbabilityHandler(unhandleData)
    humidity = humidityHandler(unhandleData)
    let display = ''
    for(let i = 0 ; i < 6 ; i++ ){
        display +=
        `
        <div class="card">
        <h2>${city}</h2>
        <h3>${time[i]}</h3>
        <div class="weather-temp">
        <img src="img/資產 1.png" alt="" />
        <h3>${temperature[i]}°C</h3>
        </div>
        <div class="info">
        <table>
            <thead>
            <tr>
                <th colspan="2">天氣資訊</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>天氣現象</td>
                <td>${weather[i]}</td>
            </tr>
            <tr>
                <td>體感溫度</td>
                <td>${bodyTemperature[i]}°C</td>
            </tr>
            <tr>
                <td>降雨機率</td>
                <td>${rainProbability[i] === ' ' ? '未測出' : rainProbability[i]+'%'}</td>
            </tr>
            <tr>
                <td>相對溼度</td>
                <td>${humidity[i]}%</td>
            </tr>
            </tbody>
        </table>
        </div>
        </div>
        `
    }
    
    cards.innerHTML = display
}



getDateAJAX()
