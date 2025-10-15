   let timeLeft = parseInt("{{ tempo|default(60, true) }}", 10);
    if (isNaN(timeLeft)) timeLeft = 60;

    window.addEventListener('DOMContentLoaded', () => {
      const timeDisplay = document.getElementById('time');
      const form = document.getElementById('formResposta');
      if (!timeDisplay || !form) return;

      timeDisplay.textContent = timeLeft;

      const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(timer);
          const t = document.getElementById('timeout');
          if (t) t.value = '1';
          form.submit();
        }
      }, 1000);
    });

       const APP_SOUND_KEY = 'app_sound_enabled';
    const musica = document.getElementById('bgmusic');

    // Função auxiliar
    function soundEnabled() {
      return (localStorage.getItem(APP_SOUND_KEY) ?? 'on') === 'on';
    }

    // Quando carregar a página
    window.addEventListener('DOMContentLoaded', async () => {
      if (!musica) return;

      // Se estiver mudo globalmente
      if (!soundEnabled()) {
        musica.muted = true;
        musica.volume = 0;
        try { musica.pause(); } catch {}
        return;
      }

      try {
        musica.volume = 0.8;
        await musica.play();
      } catch (e) {
        // Caso o navegador bloqueie autoplay
      }
    });