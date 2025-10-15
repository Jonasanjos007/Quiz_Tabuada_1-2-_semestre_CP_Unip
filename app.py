from flask import Flask, render_template, request, redirect, session, url_for, send_from_directory
import random
import os

app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = 'segredo_123'


# ============================================
# 🔢 Função de gerar perguntas
# ============================================
def gerar_pergunta():
    """Gera uma pergunta de acordo com o nível escolhido (tabuada adaptada e corrigida para divisões)."""
    nivel_raw = session.get('nivel', 'facil')
    nivel = nivel_raw.strip().lower()

    num1 = num2 = resultado = None
    operador = None

    # === NÍVEL FÁCIL ===
    if nivel == 'facil':
        operadores = ['+', '-', '*', '/']
        operador = random.choice(operadores)

        if operador == '+':
            num1 = random.randint(1, 9)
            num2 = random.randint(1, 9)
            resultado = num1 + num2

        elif operador == '-':
            num1 = random.randint(1, 9)
            num2 = random.randint(1, num1)
            resultado = num1 - num2

        elif operador == '*':
            num1 = random.randint(1, 9)
            num2 = random.randint(1, 9)
            resultado = num1 * num2

        elif operador == '/':
            num2 = random.randint(1, 9)
            resultado = random.randint(1, 9)
            num1 = resultado * num2
            while num1 > 9:
                resultado = random.randint(1, 9)
                num1 = resultado * num2

    # === NÍVEL MÉDIO ===
    elif nivel == 'medio':
        operadores = ['+', '-', '*', '/']
        operador = random.choice(operadores)

        if operador == '+':
            num1 = random.randint(10, 20)
            num2 = random.randint(1, 9)
            resultado = num1 + num2

        elif operador == '-':
            num1 = random.randint(10, 20)
            num2 = random.randint(1, min(9, num1))
            resultado = num1 - num2

        elif operador == '*':
            num1 = random.randint(10, 20)
            num2 = random.randint(1, 9)
            resultado = num1 * num2

        elif operador == '/':
            num2 = random.randint(1, 9)
            resultado = random.randint(1, 9)
            num1 = resultado * num2
            while num1 < 10 or num1 > 20:
                num2 = random.randint(1, 9)
                resultado = random.randint(1, 9)
                num1 = resultado * num2

    # === NÍVEL DIFÍCIL ===
    elif nivel == 'dificil':
        operadores = ['+', '-']
        operador = random.choice(operadores)

        if operador == '+':
            num1 = random.randint(100, 1000)
            num2 = random.randint(100, 1000)
            resultado = num1 + num2

        elif operador == '-':
            num1 = random.randint(100, 1000)
            num2 = random.randint(100, min(1000, num1))
            resultado = num1 - num2

    # === NÍVEL EXTREMO ===
    elif nivel == 'extremo':
        operadores = ['+', '-', '*', '/']
        operador = random.choice(operadores)
        num1 = num2 = resultado = 0

        if operador == '+':
            num1 = random.randint(100, 1000)
            num2 = random.randint(100, 1000)
            resultado = num1 + num2

        elif operador == '-':
            num1 = random.randint(100, 1000)
            num2 = random.randint(1, num1)
            resultado = num1 - num2

        elif operador == '*':
            num1 = random.randint(100, 1000)
            num2 = random.randint(1, 10)
            resultado = num1 * num2

        elif operador == '/':
            num2 = random.randint(2, 10)
            resultado = random.randint(7, 100)
            num1 = resultado * num2
            while num1 < 100 or num1 > 1000:
                num2 = random.randint(2, 10)
                resultado = random.randint(7, 100)
                num1 = resultado * num2

    else:
        num1 = random.randint(1, 9)
        num2 = random.randint(1, 9)
        operador = '+'
        resultado = num1 + num2

    opcoes = {resultado}
    spread = max(3, int(abs(resultado) * 0.2))

    while len(opcoes) < 4:
        delta = random.randint(1, spread)
        errada = resultado + random.choice([-delta, delta])
        if errada not in opcoes and errada >= 0:
            opcoes.add(errada)

    opcoes = list(opcoes)
    random.shuffle(opcoes)

    return {
        'num1': num1,
        'num2': num2,
        'operador': operador,
        'resultado': resultado,
        'opcoes': opcoes
    }


# ============================================
# 🧠 ROTAS DO JOGO
# ============================================

@app.route('/')
def inicio():
    return render_template('iniciar_jogo.html')

@app.route('/nivel')
def escolher_nivel():
    return render_template('nivel.html')

@app.route('/tempo')
def escolher_tempo():
    if 'nivel' not in session:
        return redirect('/nivel')
    return render_template('tempo.html')

@app.route('/iniciar', methods=['POST'])
def iniciar():
    session['nivel'] = request.form.get('nivel')
    session['acertos'] = 0
    session['erros'] = 0
    session['pontos'] = 0
    session['pergunta'] = 1
    session['pergunta_atual'] = gerar_pergunta()
    return redirect('/tempo')

@app.route('/fim')
def fim():
    return render_template('fim.html',
                           acertos=session.get('acertos', 0),
                           erros=session.get('erros', 0),
                           nivel=session.get('nivel', 'leve'))

@app.route('/jogo')
def jogo():
    if 'pergunta_atual' not in session:
        return redirect('/nivel')

    tempo = session.get('tempo_por_pergunta', 30)
    msg = session.pop('flash_msg', None)

    return render_template(
        'index.html',
        pergunta=session['pergunta_atual'],
        num_pergunta=session['pergunta'],
        acertos=session['acertos'],
        erros=session['erros'],
        pontos=session.get('pontos', 0),
        nivel=session['nivel'],
        tempo=tempo,
        mensagem=msg
    )

@app.route('/responder', methods=['POST'])
def responder():
    estourou_tempo = request.form.get('timeout') == '1'

    session.setdefault('acertos', 0)
    session.setdefault('erros', 0)
    session.setdefault('pontos', 0)
    session.setdefault('pergunta', 1)
    session.setdefault('nivel', 'leve')

    valores = {'facil': 5, 'medio': 7, 'dificil': 9, 'extremo': 10}
    if 'pergunta_atual' not in session:
        session['pergunta_atual'] = gerar_pergunta()

    correto = session['pergunta_atual']['resultado']

    if estourou_tempo:
        session['erros'] += 1
        mensagem = f"⏱️ Tempo esgotado! A resposta correta era {correto}."
    else:
        try:
            resposta = int(request.form.get('resposta', 0))
        except ValueError:
            session['flash_msg'] = "Selecione uma alternativa."
            return redirect(url_for('jogo'))

        if resposta == correto:
            session['acertos'] += 1
            pontos_ganhos = valores.get(session['nivel'], 5)
            session['pontos'] += pontos_ganhos
            mensagem = f"✅ Correto! (+{pontos_ganhos} pontos)"
        else:
            session['erros'] += 1
            mensagem = f"❌ Errado! O resultado certo era {correto}."

    session['pergunta'] += 1

    if session['pergunta'] > 10:
        acertos = session['acertos']
        erros = session['erros']
        pontos = session['pontos']
        nivel = session['nivel']

        if acertos <= 1: estrelas = 1
        elif acertos <= 3: estrelas = 3
        elif acertos <= 5: estrelas = 4
        elif acertos <= 8: estrelas = 6
        else: estrelas = 7
    
        return render_template('fim.html', acertos=acertos, erros=erros, pontos=pontos, nivel=nivel, estrelas=estrelas)

    session['pergunta_atual'] = gerar_pergunta()
    session['flash_msg'] = mensagem
    return redirect(url_for('jogo'))


@app.route('/definir_tempo', methods=['POST'])
def definir_tempo():
    session['tempo_por_pergunta'] = int(request.form.get('tempo', 60))
    session.setdefault('acertos', 0)
    session.setdefault('erros', 0)
    session.setdefault('pontos', 0)
    if 'pergunta_atual' not in session:
        session['pergunta'] = 1
        session['pergunta_atual'] = gerar_pergunta()
    return redirect('/jogo')

@app.route('/reiniciar')
def reiniciar():
    session.clear()
    return redirect('/nivel')

@app.get('/manual')
def manual():
    return render_template('manual.html')

@app.route('/horadepraticar')
def hora_de_praticar():
    return render_template('horadepraticar.html')


# ============================================
# 📱 ROTAS DO PWA
# ============================================

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

@app.route('/service-worker.js')
def service_worker():
    return send_from_directory('static', 'service-worker.js')

@app.route('/logo.png')
def logo():
    return send_from_directory('static/imagens', 'logo.png')


# ============================================
# 🚀 EXECUÇÃO
# ============================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)
