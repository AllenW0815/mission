// API
const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-0A4AAE63-1212-4C3D-9C26-AD82E6CDE2A2&elementName=MaxAT,PoP12h,T,RH,Wx'
const url2 = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-0A4AAE63-1212-4C3D-9C26-AD82E6CDE2A2&elementName='

// DOM
const select = document.querySelector('#select')
const today = document.querySelector('.today')
const cards = document.querySelector('.cards')

// 設定 select 的 option
const setOption = (data) =>{
    let display = ''
    for(let i = 0 ; i < data.length ; i++){
        display += 
        `
        <option value="${data[i].locationName}">${data[i].locationName}</option>
        `      
    }
    select.innerHTML = display
}

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
    console.log(unhandleData);
    let result = [];
    for (let i = 3; i < unhandleData.weatherElement[2].time.length; i+=2) {
        result.push(unhandleData.weatherElement[2].time[i].elementValue[0].value)       
    }
    // console.log(result);
    return result
}

// 生成 main-card
const showMainCard = (data) =>{
    let display = ''
    
    locationName = data[0].locationName
    time = data[0].weatherElement[0].time[0].startTime
    timeConvert = time.slice(0,11)
    temperature = data[0].weatherElement[1].time[0].elementValue[0].value
    weather = data[0].weatherElement[4].time[0].elementValue[0].value
    bodyTemperature = data[0].weatherElement[3].time[0].elementValue[0].value
    rainProbability = data[0].weatherElement[0].time[0].elementValue[0].value
    humidity = data[0].weatherElement[2].time[0].elementValue[0].value

    display += 
    `
    <h2>${locationName}</h2>
    <h3>${timeConvert}</h3>
    <div class="weather-temp">
    <img src="img/資產 1.png" alt="" />
    <h3>${temperature}度</h3>
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
            <td>${bodyTemperature}</td>
        </tr>
        <tr>
            <td>降雨機率</td>
            <td>${rainProbability}</td>
        </tr>
        <tr>
            <td>相對溼度</td>
            <td>${humidity}</td>
        </tr>
        </tbody>
    </table>
    `
    
    today.innerHTML = display
} 

// 生成 cards
const showCards = (data) =>{
    // console.log(data[0]);
    let unhandleData = data[0]
    // 已在上一層宣告
    locationName = unhandleData.locationName
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
        <h2>${locationName}</h2>
        <h3>${time[i]}</h3>
        <div class="weather-temp">
        <img src="img/資產 1.png" alt="" />
        <h3>${temperature[i]}度</h3>
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
                <td>${bodyTemperature[i]}</td>
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

// AJAX 取資料
const getDateAJAX = () => {
    fetch(url)
    .then((res)=>{
       return res.json()
    })
    .then((result)=>{
        let data = result.records.locations[0].location
        // console.log(data);
        //測試
        // console.log(data[0].weatherElement[0].time[0].elementValue[0].value);
        // console.log(data[0].weatherElement[1].time[0].elementValue[0].value);
        // console.log(data[0].weatherElement[2].time[0].elementValue[0].value);
        // console.log(data[0].weatherElement[3].time[0].elementValue[0].value);
        // console.log(data[0].weatherElement[4].time[0].elementValue[0].value);
    
        let locationName =  null
        let time = null
        let temperature = null
        let weather = null
        let bodyTemperature = null
        let rainProbability = null
        let humidity = null

        let display =''

        setOption(data)
        showMainCard(data)
        showCards(data)

    })
}

getDateAJAX()


// for (let i = 1 ; i < 7 ; i++){            
//     locationName = data[i].locationName
//     time = data[i].weatherElement[i-1].time[i].startTime
//     timeConvert = time.slice(0,11)
//     temperature = data[i].weatherElement[i].time[i].elementValue[i].value
//     weather = data[i].weatherElement[i+3].time[i].elementValue[i].value
//     bodyTemperature = data[i].weatherElement[i+2].time[i].elementValue[i].value
//     rainProbability = data[i].weatherElement[i-1].time[i].elementValue[i].value
//     humidity = data[i].weatherElement[i+1].time[i].elementValue[i].value

//     display += 
//     `
//     <div class="card">
//         <h2>${locationName}</h2>
//         <h3>${timeConvert}</h3>
//         <div class="weather-temp">
//         <img src="img/資產 1.png" alt="" />
//         <h3>${temperature}度</h3>
//         </div>
//         <div class="info">
//         <table>
//             <thead>
//             <tr>
//                 <th colspan="2">天氣資訊</th>
//             </tr>
//             </thead>
//             <tbody>
//             <tr>
//                 <td>天氣現象</td>
//                 <td>${weather}</td>
//             </tr>
//             <tr>
//                 <td>體感溫度</td>
//                 <td>${bodyTemperature}</td>
//             </tr>
//             <tr>
//                 <td>降雨機率</td>
//                 <td>${rainProbability}</td>
//             </tr>
//             <tr>
//                 <td>相對溼度</td>
//                 <td>${humidity}</td>
//             </tr>
//             </tbody>
//         </table>
//         </div>
//     </div>
//     `
// }
// console.log(display);
// cards.innerHTML = display