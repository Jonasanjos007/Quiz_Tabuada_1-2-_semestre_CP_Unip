 const musica = document.getElementById('bgmusic');
  const botao  = document.getElementById('toggleMute');
  const APP_SOUND_KEY = 'app_sound_enabled';
  const VOLUME = 0.35;

  // estado inicial baseado na preferência global
  let enabled = (localStorage.getItem(APP_SOUND_KEY) ?? 'on') === 'on';
  musica.volume = VOLUME;
  musica.muted  = !enabled;

  // tenta tocar; se bloquear, vida que segue
  try { musica.play().catch(()=>{}); } catch(e){}

  botao.textContent = musica.muted ? '🔇' : '🔊';

  // toggle que atualiza a preferência global
  botao.addEventListener('click', async () => {
    if (musica.paused) { try { await musica.play(); } catch(e){} }
    musica.muted = !musica.muted;
    enabled = !musica.muted;
    localStorage.setItem(APP_SOUND_KEY, enabled ? 'on' : 'off');
    botao.textContent = musica.muted ? '🔇' : '🔊';
  });