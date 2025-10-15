    const sidebar = document.getElementById('sidebar');
        const menuBtn = document.getElementById('menuBtn');
        menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
        document.querySelectorAll('.toc a').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const id = a.getAttribute('href').slice(1);
                document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                sidebar.classList.remove('open');
            });
        });

        // ===== Botões =====
        document.getElementById('printBtn').addEventListener('click', () => window.print());
        document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        // ===== Confete =====
        const emojiContainer = document.getElementById('emojiContainer');
        function soltarEmojis(emoji, count = 25) {
            for (let i = 0; i < count; i++) {
                const e = document.createElement('div');
                e.className = 'emoji'; e.textContent = emoji;
                e.style.left = Math.random() * 100 + 'vw';
                e.style.fontSize = (16 + Math.random() * 28) + 'px';
                e.style.animationDuration = (2 + Math.random() * 3) + 's';
                emojiContainer.appendChild(e);
                setTimeout(() => e.remove(), 6000);
            }
        }
        document.getElementById('playConfetti').addEventListener('click', () => {
            soltarEmojis('🎉', 20); soltarEmojis('✨', 10); soltarEmojis('🏆', 10);
        });

  // Helper para setar múltiplas CSS vars
  function setVars(map){
    for (const [k,v] of Object.entries(map)) {
      document.documentElement.style.setProperty(k, v);
    }
  }

  let dark = true;

  function applyDark(){
    setVars({
      '--bg1': '#0b0b15',
      '--bg2': '#151528',
      '--card': '#191928',
      '--accent': '#00e5ff',

      '--text': '#e8f6ff',
      '--muted-text': '#bfeeff',
      '--link': '#00e5ff',
      '--toc-link': '#dff8ff',

      '--btn-bg': '#0f1a22',
      '--btn-text': '#d9f2ff',
      '--btn-border': 'rgba(255,255,255,0.08)',

      '--sidebar-grad-1': 'rgba(255,255,255,0.015)',
      '--sidebar-grad-2': 'rgba(0,0,0,0.08)',

      '--shadow-rgb': '0,0,0'
    });
    document.body.style.color = 'var(--text)';
  }

  function applyLight(){
    setVars({
      '--bg1': '#f6f9ff',
      '--bg2': '#dff4ff',
      '--card': '#ffffff',
      '--accent': '#0056ff',

      '--text': '#0f2233',
      '--muted-text': '#385b6e',
      '--link': '#0056ff',
      '--toc-link': '#0f2233',

      '--btn-bg': '#eef5ff',
      '--btn-text': '#0f2233',
      '--btn-border': '#c8dbff',

      '--sidebar-grad-1': 'rgba(0,0,0,0.02)',
      '--sidebar-grad-2': 'rgba(0,0,0,0.06)',

      '--shadow-rgb': '0,0,0' /* mantém sombra suave */
    });
    document.body.style.color = 'var(--text)';
  }

  // aplica tema inicial escuro
  applyDark();

  document.getElementById('toggleTheme').addEventListener('click', () => {
    dark = !dark;
    if (dark) applyDark(); else applyLight();
  });



        // confete na abertura
        window.addEventListener('load', () => setTimeout(() => soltarEmojis('✨', 15), 600));