setInterval(() => {
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  const now = moment();
  date.innerText = now.format("jDD/jMM/jYYYY");
  time.innerText = now.format("HH:mm:ss");
}, 1000);
