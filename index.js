function init() {
	fetch(
		'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
	)
		.then((res) => res.json())
		.then((data) => {
			document.body.style.backgroundImage = `url('${data.urls.full}')`
			document.getElementById(
				'author'
			).textContent = `By: ${data.user.name}`
		})
		.catch((err) => {
			document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1544084944-15269ec7b5a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTgzOTU4ODZ8&ixlib=rb-4.0.3&q=85)`
			document.getElementById('author').textContent = `By: Sasha Freemind`
		})

	fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
		.then((res) => res.json())
		.then((data) => {
			document.getElementById('crypto-top').innerHTML = `
                <img src="${data.image.small}" alt="Image of Bitcoin currency" />
                <p>${data.name}</p>
            `
			document.getElementById('crypto').innerHTML += `
                <p>🎯: ${data.market_data.current_price.sek} SEK</p>
                <p>👆: ${data.market_data.high_24h.sek} SEK</p>
                <p>👇: ${data.market_data.low_24h.sek} SEK</p>
            `
		})
		.catch((err) => console.error(err))
}

function getCurrentTime() {
	const date = new Date()
	document.getElementById('time').textContent = date.toLocaleTimeString(
		'sv-SE',
		{
			timeStyle: 'short',
		}
	)
}

function getWeather() {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&
            lon=${position.coords.longitude}&units=metric`)
				.then((res) => {
					if (!res.ok) {
						throw Error('Weather data not available')
					}
					return res.json()
				})
				.then((data) => {
					console.log(data)
					const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
					document.getElementById('weather').innerHTML = `
						<img src="${iconUrl}" />
						<p>${Math.round(data.main.temp)}º</p>
						<p>${Math.round(data.name)}</p>
					`
				})
				.catch((err) => console.error(err))
		},
		(err) => {
			console.log(err)
			document.getElementById('weather').innerHTML = `
						<img class="icon" src="./img/sun_icon.png" />
						<p>32º</p>
						<p>Stockholm</p>
						`
		},
		{ timeout: 10000 }
	)
}

init()

getWeather()

setInterval(getCurrentTime, 1000)
