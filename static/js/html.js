  let tempo = 100;
    const timeEl = document.getElementById("time");
    const timer = setInterval(() => {
      tempo--;
      timeEl.textContent = tempo;
      if (tempo <= 0) {
        clearInterval(timer);
        window.location.href = "/fim";
      }
    }, 1000);