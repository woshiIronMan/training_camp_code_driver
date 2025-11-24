// /**
//  * 目标1：默认显示-北京市天气
//  *  1.1 获取北京市天气数据
//  *  1.2 数据展示到页面
//  */
function getWeater(cityCode) {
  // 1：默认显示-北京市天气
  myAxios({
    url: 'https://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode
    }
  }).then(result => {
    console.log(result.data);
    const wObj = result.data
    //1.2 展示数据
    //阳历和农历
    const dataStr = `
     <span class="dateShort">${wObj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wObj.dateLunar}</span>
      </span>`
    document.querySelector('.title').innerHTML = dataStr
    //城市的名字
    document.querySelector('.area').innerHTML = wObj.area
    //当天的气温
    const nowWstr = `<div class="tem-box">
        <span class="temp">
          <span class="temperature">${wObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wObj.psPm25}</span>
          <span class="psPm25Level">${wObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="${wObj.weatherImg}" class="weatherImg" alt="">
            <span class="weather">${wObj.weather}</span>
          </li>
          <li class="windDirection">${wObj.windDirection}</li>
          <li class="windPower">${wObj.windPower}</li>
        </ul>
      </div>`
    document.querySelector('.weather-box').innerHTML = nowWstr

    //当天的天气
    const twObj = wObj.todayWeather

    const todayWstr = `<div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${twObj.weather}</span>
          <span class="temNight">${twObj.temNight}</span>
          <span>-</span>
          <span class="temDay">${twObj.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${twObj.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${twObj.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${twObj.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${twObj.sunsetTime}</span>
        </li>
      </ul>`
    document.querySelector('.today-weather').innerHTML = todayWstr

    //7日天气预报的展示
    const dayForecast = wObj.dayForecast
    const dayForecastStr = dayForecast.map(item => {
      return `<li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src="${item.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">&lt;${item.windPower}</span>
          </div>
        </li>`
    }).join('')
    // console.log(dayForecastStr)
    document.querySelector('.week-wrap').innerHTML = dayForecastStr
  })
}
//默认进入网页就要获取一次
getWeater('110100')

/**
 * 需求：根据关键字，展示匹配城市列表
步骤：
1. 绑定 input 事件，获取关键字
2. 获取展示城市列表数据
 */

//2.11. 绑定 input 事件，获取关键字
document.querySelector('.search-city').addEventListener('input', (e) => {
  console.log(e.target.value)
  //2.2 获取展示城市列表数据
  myAxios({
    url: 'https://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }
  }).then(result => {
    console.log(result)
    const liStr = result.data.map(item => {
      return `<li class="city-item" data-code ="${item.code}">${item.name}</li>`
    }).join('')
    console.log(liStr)
    document.querySelector('.search-list').innerHTML = liStr
  })
})

/**
 * 需求：展示用户搜索查看的城市天气
步骤：
1. 检测搜索列表点击事件，获取城市 code 值
2. 复用获取展示城市天气函数
 */
document.querySelector('.search-list').addEventListener('click', e => {
  if (e.target.classList.contains('city-item')) {
    //只有点击城市li才会走到这里
    const cityCode = e.target.dataset.code
    console.log(cityCode)
    //3.2复用获取展示城市天气函数
    getWeater(cityCode)
  }
})

