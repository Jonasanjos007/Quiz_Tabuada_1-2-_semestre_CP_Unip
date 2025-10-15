  function voltarInicio() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function celebrar() {
            for (let i = 0; i < 50; i++) {
                const confete = document.createElement('div');
                confete.className = 'confetti';
                confete.style.left = Math.random() * window.innerWidth + 'px';
                confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
                confete.style.animationDuration = 1.5 + Math.random() * 1.5 + 's';
                document.body.appendChild(confete);
                setTimeout(() => confete.remove(), 2500);
            }
        }

        function alternarTema() {
            document.body.classList.toggle('light-mode');
        }

        // ====== FUNÇÕES ORIGINAIS ======
        function mostrarTabuada() {
            let num = parseInt(document.getElementById('numeroTabuada').value);
            let resultadoDiv = document.getElementById('tabuadaResultado');
            if (isNaN(num) || num < 1) {
                resultadoDiv.innerHTML = "<p style='color:red;'>Por favor, digite um número válido maior que 0! 🤔</p>";
                return;
            }
            let tabuada = `<h3>Tabuada do ${num}:</h3>`;
            for (let i = 1; i <= 10; i++) {
                tabuada += `<div>${num} x ${i} = <strong>${num * i}</strong></div>`;
            }
            resultadoDiv.innerHTML = tabuada;
        }

        // Lista de Dicas de Cálculo Mental atualizadas
        const dicas = [
            {
                titulo: "➕ Adição - Arredondar e Ajustar",
                texto: "Uma forma fácil de somar números é arredondando e depois ajustando!",
                exemplo: "Para 48 + 26:<br>Arredonde 48 para 50 (somando 2)<br>Some 50 + 26 = 76<br>Agora ajuste: 76 - 2 = 74"
            },
            {
                titulo: "➕ Adição - Separar em Partes",
                texto: "Quebre os números em dezenas e unidades para somar com mais facilidade!",
                exemplo: "Para 37 + 45:<br>Some as dezenas: 30 + 40 = 70<br>Some as unidades: 7 + 5 = 12<br>Junte tudo: 70 + 12 = 82"
            },
            {
                titulo: "➖ Subtração - Decompor os Números",
                texto: "Transforme a subtração em uma operação mais simples decompondo os números!",
                exemplo: "Para 72 - 38:<br>72 = 60 + 12 (emprestando da dezena)<br>Agora: 60 - 30 = 30<br>E: 12 - 8 = 4<br>Resultado: 30 + 4 = 34"
            },
            {
                titulo: "➖ Subtração - Subtrair em Etapas",
                texto: "Divida a subtração em partes menores para facilitar o cálculo!",
                exemplo: "Para 95 - 27:<br>Primeiro subtraia 20: 95 - 20 = 75<br>Depois subtraia 7: 75 - 7 = 68"
            },
            {
                titulo: "✖️ Multiplicação - Dobrar e Dividir",
                texto: "Use o dobro para resolver multiplicações de forma mais rápida!",
                exemplo: "Para 16 × 4:<br>Dobre o 16: 16 × 2 = 32<br>Dobre novamente: 32 × 2 = 64"
            },
            {
                titulo: "✖️ Multiplicação - Usar Multiplicações Conhecidas",
                texto: "Separe o número em partes que você já sabe multiplicar!",
                exemplo: "Para 13 × 6:<br>10 × 6 = 60<br>3 × 6 = 18<br>Some: 60 + 18 = 78"
            },
            {
                titulo: "➗ Divisão - Pensar na Multiplicação Inversa",
                texto: "Lembre-se que divisão é o inverso da multiplicação!",
                exemplo: "Para 63 ÷ 9:<br>Pergunte: 'Que número vezes 9 dá 63?'<br>7 × 9 = 63, então resposta é 7"
            },
            {
                titulo: "➗ Divisão - Dividir em Partes",
                texto: "Quebre o número em partes menores para dividir mais facilmente!",
                exemplo: "Para 84 ÷ 6:<br>Primeiro: 60 ÷ 6 = 10<br>Depois: 24 ÷ 6 = 4<br>Some: 10 + 4 = 14"
            }
        ];

        // Mostrar uma dica aleatória
        function mostrarDica() {
            const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
            const dicasDiv = document.getElementById('dicasMat');
            dicasDiv.innerHTML = `
                <div class="dica">
                    <h3>${dicaAleatoria.titulo}</h3>
                    <p>${dicaAleatoria.texto}</p>
                    <div class="dica-exemplo">${dicaAleatoria.exemplo}</div>
                </div>
            `;
        }

        // Função para a Tabuada
        function mostrarTabuada() {
            // Pega o número que o usuário digitou
            var num = parseInt(document.getElementById('numeroTabuada').value);
            var resultadoDiv = document.getElementById('tabuadaResultado');

            // Verifica se é um número válido
            if (isNaN(num) || num < 1) {
                resultadoDiv.innerHTML = "<p style='color: red;'>Por favor, digite um número válido maior que 0! 🤔</p>";
                return;
            }

            // Constrói a tabuada usando um loop
            var tabuada = '<h3>Tabuada do ' + num + ':</h3>';
            for (var count = 1; count <= 10; count++) {
                tabuada += '<div class="tabuada-item">' + num + ' x ' + count + ' = <strong>' + (num * count) + '</strong></div>';
            }
            resultadoDiv.innerHTML = tabuada;
        }

        // Lista de Perguntas Aleatórias
        const perguntas = [
            // ADIÇÃO
            {
                pergunta: "Quanto é 110 + 45?",
                opcoes: ["155", "165"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 25 + 55?",
                opcoes: ["70", "80"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 23 + 22?",
                opcoes: ["45", "55"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 18 + 14?",
                opcoes: ["32", "42"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 88 + 33?",
                opcoes: ["111", "121"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 67 + 28?",
                opcoes: ["85", "95"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 42 + 19?",
                opcoes: ["51", "61"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 150 + 75?",
                opcoes: ["215", "225"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 36 + 47?",
                opcoes: ["73", "83"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 91 + 64?",
                opcoes: ["145", "155"],
                respostaCorreta: 1
            },

            // SUBTRAÇÃO
            {
                pergunta: "Quanto é 100 - 27?",
                opcoes: ["63", "73"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 200 - 120?",
                opcoes: ["60", "80"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 45 - 60?",
                opcoes: ["-15", "-25"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 130 - 220?",
                opcoes: ["-90", "-80"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 83 - 61?",
                opcoes: ["12", "22"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 95 - 38?",
                opcoes: ["47", "57"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 170 - 85?",
                opcoes: ["75", "85"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 50 - 72?",
                opcoes: ["-22", "-32"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 124 - 90?",
                opcoes: ["24", "34"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 300 - 215?",
                opcoes: ["75", "85"],
                respostaCorreta: 1
            },

            // MULTIPLICAÇÃO
            {
                pergunta: "Quanto é 12 × 5?",
                opcoes: ["50", "60"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 7 × 8?",
                opcoes: ["56", "64"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 4 × 5?",
                opcoes: ["15", "20"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 25 × 3?",
                opcoes: ["65", "75"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 9 × 6?",
                opcoes: ["54", "64"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 6 × 15?",
                opcoes: ["80", "90"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 11 × 9?",
                opcoes: ["99", "109"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 8 × 7?",
                opcoes: ["56", "66"],
                respostaCorreta: 0
            },
            {
                pergunta: "Quanto é 13 × 4?",
                opcoes: ["42", "52"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 10 × 12?",
                opcoes: ["100", "120"],
                respostaCorreta: 1
            },

            // DIVISÃO
            {
                pergunta: "Quanto é 30 ÷ 5?",
                opcoes: ["5", "6"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 40 ÷ 8?",
                opcoes: ["4", "5"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 60 ÷ 5?",
                opcoes: ["10", "12"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 100 ÷ 4?",
                opcoes: ["20", "25"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 55 ÷ 5?",
                opcoes: ["10", "11"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 81 ÷ 9?",
                opcoes: ["8", "9"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 72 ÷ 6?",
                opcoes: ["11", "12"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 45 ÷ 3?",
                opcoes: ["12", "15"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 96 ÷ 8?",
                opcoes: ["11", "12"],
                respostaCorreta: 1
            },
            {
                pergunta: "Quanto é 108 ÷ 12?",
                opcoes: ["8", "9"],
                respostaCorreta: 1
            }
        ];

        let acertos = 0;
        let erros = 0;
        let perguntaAtual = null;
        let perguntasDisponiveis = [];
        let quizAtivo = false;

        // Iniciar o quiz
        function iniciarQuiz() {
            acertos = 0;
            erros = 0;
            // Criar uma cópia do array de perguntas para as perguntas disponíveis
            perguntasDisponiveis = [...perguntas];
            quizAtivo = true;

            document.getElementById('btnIniciar').style.display = 'none';
            document.getElementById('pontuacao').textContent = `Acertos: ${acertos} | Erros: ${erros}`;
            document.getElementById('progresso').textContent = `Pergunta 0 de ${perguntas.length}`;
            document.getElementById('finalMessage').style.display = 'none';

            fazerPergunta();
        }

        // Fazer uma pergunta aleatória
        function fazerPergunta() {
            // Verificar se ainda há perguntas disponíveis
            if (perguntasDisponiveis.length === 0) {
                mostrarResultadoFinal();
                return;
            }

            // Escolher uma pergunta aleatória das disponíveis
            const indiceAleatorio = Math.floor(Math.random() * perguntasDisponiveis.length);
            perguntaAtual = perguntasDisponiveis[indiceAleatorio];

            // Remover a pergunta escolhida das disponíveis
            perguntasDisponiveis.splice(indiceAleatorio, 1);

            const perguntaContainer = document.getElementById('perguntaContainer');
            const perguntaTexto = document.getElementById('perguntaTexto');
            const opcoesResposta = document.getElementById('opcoesResposta');
            const resultadoPergunta = document.getElementById('resultadoPergunta');

            // Atualizar progresso
            const perguntasRespondidas = perguntas.length - perguntasDisponiveis.length;
            document.getElementById('progresso').textContent = `Pergunta ${perguntasRespondidas} de ${perguntas.length}`;

            // Mostrar a pergunta
            perguntaContainer.style.display = 'block';
            perguntaTexto.textContent = perguntaAtual.pergunta;

            // Limpar opções anteriores
            opcoesResposta.innerHTML = '';
            resultadoPergunta.style.display = 'none';

            // Adicionar as opções de resposta
            perguntaAtual.opcoes.forEach((opcao, index) => {
                const opcaoElement = document.createElement('div');
                opcaoElement.className = 'opcao';
                opcaoElement.textContent = opcao;
                opcaoElement.onclick = () => verificarResposta(index);
                opcoesResposta.appendChild(opcaoElement);
            });
        }

        // Verificar se a resposta está correta
        function verificarResposta(respostaIndex) {
            const resultadoPergunta = document.getElementById('resultadoPergunta');

            // Desativar as opções para evitar múltiplos cliques
            const opcoes = document.querySelectorAll('.opcao');
            opcoes.forEach(opcao => {
                opcao.style.pointerEvents = 'none';
            });

            if (respostaIndex === perguntaAtual.respostaCorreta) {
                resultadoPergunta.textContent = "🎉 Parabéns! Resposta CORRETA! Você é um gênio da matemática! 👏";
                resultadoPergunta.className = "resultado correto";
                acertos++;
            } else {
                resultadoPergunta.textContent = `🧐 Quase lá! A resposta correta é ${perguntaAtual.opcoes[perguntaAtual.respostaCorreta]}. Continue tentando! 💪`;
                resultadoPergunta.className = "resultado incorreto";
                erros++;
            }

            resultadoPergunta.style.display = 'block';
            document.getElementById('pontuacao').textContent = `Acertos: ${acertos} | Erros: ${erros}`;

            // Aguardar 1.5 segundos e ir para a próxima pergunta
            setTimeout(() => {
                if (perguntasDisponiveis.length > 0) {
                    fazerPergunta();
                } else {
                    mostrarResultadoFinal();
                }
            }, 1500);
        }

        // Mostrar resultado final
        function mostrarResultadoFinal() {
            const porcentagemAcertos = (acertos / perguntas.length) * 100;
            const finalMessage = document.getElementById('finalMessage');

            if (porcentagemAcertos >= 60) {
                finalMessage.textContent = "🎊 Parabéns! Você está pronto, tente jogar o jogo agora! 🎮";
                finalMessage.className = "final-message aprovado";
            } else {
                finalMessage.textContent = "😉 Não se preocupe, apenas tente novamente! Você vai melhorar! 💪";
                finalMessage.className = "final-message reprovado";
            }

            finalMessage.style.display = 'block';
            document.getElementById('btnIniciar').style.display = 'inline-block';
            document.getElementById('btnIniciar').textContent = 'Reiniciar Quiz';
            quizAtivo = false;
        }