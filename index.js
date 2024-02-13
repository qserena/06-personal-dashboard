try {
	const res = await fetch(
		'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
	)
	const data = await res.json()
	document.body.style.backgroundImage = `url('${data.urls.full}')`
	document.getElementById('author').textContent = `By: ${data.user.name}`
} catch (err) {
	document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
	document.getElementById('author').textContent = `By: Dodi Achmad`
}

const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
if (!response.ok) {
	throw Error('Something went wrong')
}
const dat = await response.json()

document.getElementById('crypto-top').innerHTML = `
		<img src="${dat.image.small}" alt="Image of Bitcoin currency" />
		<p>${dat.name}</p>
	`
document.getElementById('crypto').innerHTML += `
		<p>🎯: ${dat.market_data.current_price.sek} SEK</p>
		<p>👆: ${dat.market_data.high_24h.sek} SEK</p>
		<p>👇: ${dat.market_data.low_24h.sek} SEK</p>
    `

function getCurrentTime() {
	const date = new Date()
	document.getElementById('time').textContent = date.toLocaleTimeString(
		'sv-SE',
		{
			timeStyle: 'short',
		}
	)
}

setInterval(getCurrentTime, 1000)

let latitude = 0
let longitude = 0

async function error() {
	console.log('Unable to retrieve your location')
	// Östermalm values if we can't get location
	latitude = 59.3368
	longitude = 18.0825
	await getWeather()
}

navigator.geolocation.getCurrentPosition(async (position) => {
	latitude = position.coords.latitude
	longitude = position.coords.longitude
	console.log('Success')
	await getWeather()
}, error)

async function getWeather() {
	const resp = await fetch(
		`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`
	)
	if (!resp.ok) {
		console.log(
			'Maybe something fishy is going on here, be careful for gods sake!!!'
		)
		throw Error('Weather data not available')
	}

	const datat = await resp.json()
	console.log(datat)
	const iconUrl = `http://openweathermap.org/img/wn/${datat.weather[0].icon}@2x.png`
	document.getElementById('weather').innerHTML = `
							<img class="icon" src="${iconUrl}" />
							<p>${Math.round(datat.main.temp)}º C</p>
							<p>${Math.round(datat.wind.speed)} m/s</p>
							<p>${datat.name}</p>
						`
}
