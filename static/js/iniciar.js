// ===== Navegação =====
    const btnPraticar = document.getElementById('btnDuvida');
    const btnIniciar = document.getElementById('iniciar');
    const manualBtn = document.getElementById('manualBtn');

    // ===== Áudio (preferência global) =====
    const APP_SOUND_KEY = 'app_sound_enabled'; // 'on' | 'off'
    const musica = document.getElementById('bgmusic');
    const btnSom = document.getElementById('toggleMute');
    const gate = document.getElementById('soundGate');
    const gateBtn = document.getElementById('enableSound');
    const enterMutedBtn = document.getElementById('enterMuted');

    const VOLUME = 0.35;
    musica.volume = VOLUME;

    let wantSound = (localStorage.getItem(APP_SOUND_KEY) ?? 'on') === 'on';

    function setIcon() { btnSom.textContent = musica.muted ? '🔇' : '🔊'; }
    function showGate(v) { gate.style.display = v ? 'flex' : 'none'; }

    async function autoStart() {
      try {
        // toca mudo primeiro (desbloqueia autoplay)
        musica.muted = true;
        try { await musica.play(); } catch { }
        if (wantSound) {
          try {
            musica.muted = false;
            await musica.play();
            setIcon(); showGate(false);
          } catch {
            musica.muted = true;
            setIcon(); showGate(true);
          }
        } else {
          // usuário prefere mudo
          musica.muted = true;
          setIcon(); showGate(false);
        }
      } catch {
        musica.muted = true; setIcon();
      }
    }

    document.addEventListener('DOMContentLoaded', autoStart);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && musica.paused) autoStart();
    });
    musica.addEventListener('canplaythrough', () => { if (musica.paused) autoStart(); }, { once: true });

    // Overlay: habilitar som
    gateBtn.addEventListener('click', async () => {
      try {
        wantSound = true;
        localStorage.setItem(APP_SOUND_KEY, 'on');
        musica.muted = false;
        await musica.play();
        setIcon(); showGate(false);
      } catch {
        musica.muted = true;
        setIcon(); showGate(true);
      }
    });

    // Overlay: cancelar (entra mudo)
    enterMutedBtn.addEventListener('click', async () => {
      wantSound = false;
      localStorage.setItem(APP_SOUND_KEY, 'off');
      musica.muted = true;
      try { await musica.play(); } catch { }
      setIcon(); showGate(false);
    });

    // Botão mute/desmute
    btnSom.addEventListener('click', async () => {
      if (musica.paused) { try { await musica.play(); } catch { } }
      musica.muted = !musica.muted;
      localStorage.setItem(APP_SOUND_KEY, musica.muted ? 'off' : 'on');
      setIcon();
      if (!musica.muted) showGate(false);
    });

    // Navegação
    btnIniciar.addEventListener('click', () => {
      try { musica.pause(); } catch { }
      window.location.href = "/nivel";
    });
    btnPraticar.addEventListener('click', () => {
      window.location.href = "/horadepraticar";
    });
    manualBtn.addEventListener('click', () => {
      window.location.href = "/manual";
    });