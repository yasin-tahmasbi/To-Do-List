setInterval(() => {
    let date = document.getElementById('date')
    const now = moment()
    date.innerText = now.format('YYYY/MM/DD  HH:mm:ss')
}, 1000);

