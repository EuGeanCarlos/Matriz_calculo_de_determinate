
  /**
   * PROJETO: Mostrar passo a passo do cálculo da determinante de uma matriz.
   * OBJETIVO:
   * - Exibir a matriz 4x4 no front-end.
   * - Escolher automaticamente a melhor linha/coluna (mais zeros) para expandir.
   * - Gerar um relatório detalhado em HTML com:
   *     • fórmula de Laplace aplicada,
   *     • formação de submatrizes (minors),
   *     • cálculo detalhado do determinante 3×3 por Sarrus,
   *     • e a combinação final que gera o valor numérico.
   *
   * Observação: o código é genérico o suficiente para matrizes quadradas (tratando
   * casos base 1×1, 2×2 e 3×3 com detalhes).
   */

  // --- Definição da matriz A (dados do enunciado) ---
  const A = [
    [5, 0, 0, 0],
    [3, 2, -3, 2],
    [1, 4, 2, 1],
    [5, 2, -4, 4]
  ];

  // --- Renderiza a matriz A na tela como uma tabela ---
  // Pega o container onde a matriz será exibida
  const matrixContainer = document.getElementById('matrixContainer');

  // Função que converte uma matriz (array de arrays) em HTML de tabela
  function matrixToHtml(mat, className = 'matrix-table') {
    // Abre a tabela
    let html = `<table class="${className}">`;
    // Percorre cada linha
    for (let i = 0; i < mat.length; i++) {
      html += '<tr>';
      // Percorre cada coluna
      for (let j = 0; j < mat[i].length; j++) {
        html += `<td>${mat[i][j]}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  // Mostrar a matriz A no container
  matrixContainer.innerHTML = matrixToHtml(A);

  // Elementos da UI para controlar cálculo e exibição
  const btnCalc = document.getElementById('btnCalc');
  const btnClear = document.getElementById('btnClear');
  const stepsArea = document.getElementById('stepsArea');
  const finalResult = document.getElementById('finalResult');
  const miniResult = document.getElementById('miniResult');

  // --- Funções utilitárias para manipulação de matrizes ---

  // Retorna a submatriz (minor) obtida removendo linha r e coluna c
  function minorMatrix(mat, r, c) {
    const M = [];
    for (let i = 0; i < mat.length; i++) {
      if (i === r) continue; // pula a linha removida
      const row = [];
      for (let j = 0; j < mat.length; j++) {
        if (j === c) continue; // pula a coluna removida
        row.push(mat[i][j]);
      }
      M.push(row);
    }
    return M;
  }

  // Conta zeros numa linha (usado para escolher melhor linha para expandir)
  function countZerosInRow(mat, r) {
    let cnt = 0;
    for (let j = 0; j < mat[r].length; j++) if (mat[r][j] === 0) cnt++;
    return cnt;
  }

  // Escolhe a melhor linha (maior número de zeros) para fazer a expansão
  function chooseBestRow(mat) {
    let best = 0;
    let bestZeros = -1;
    for (let i = 0; i < mat.length; i++) {
      const zeros = countZerosInRow(mat, i);
      if (zeros > bestZeros) {
        bestZeros = zeros;
        best = i;
      }
    }
    return best;
  }

  // --- Cálculo detalhado (recursivo) com geração de HTML explicativo ---
  // Esta função retorna um objeto {det: Number, html: String} descrevendo o cálculo.
  function detDetailed(mat) {
    const n = mat.length; // dimensão da matriz

    // Caso 1x1 (mais simples)
    if (n === 1) {
      const val = mat[0][0];
      const html = `<div class="step-block">Det( [${val}] ) = ${val}</div>`;
      return { det: val, html };
    }

    // Caso base 2x2 com explicação direta: |a b; c d| = a*d - b*c
    if (n === 2) {
      const a = mat[0][0], b = mat[0][1], c = mat[1][0], d = mat[1][1];
      const calc = a * d - b * c;
      const html =
        `<div class="step-block">Det 2×2 = <strong>${a}·${d} - ${b}·${c}</strong> = ${a*d} - ${b*c} = <strong>${calc}</strong></div>`;
      return { det: calc, html };
    }

    // Caso 3x3: usamos Sarrus e mostramos todos os termos
    if (n === 3) {
      // Etiquetas para fácil leitura
      const a = mat[0][0], b = mat[0][1], c = mat[0][2];
      const d = mat[1][0], e = mat[1][1], f = mat[1][2];
      const g = mat[2][0], h = mat[2][1], i = mat[2][2];

      // Termos positivos (diagonais principais)
      const t1 = a * e * i;
      const t2 = b * f * g;
      const t3 = c * d * h;
      const sumPos = t1 + t2 + t3;

      // Termos negativos (diagonais secundárias)
      const s1 = c * e * g;
      const s2 = a * f * h;
      const s3 = b * d * i;
      const sumNeg = s1 + s2 + s3;

      const detValue = sumPos - sumNeg;

      // Monta HTML com Sarrus passo a passo
      let html = `<div class="step-block">Det 3×3 (Sarrus):</div>`;
      html += `<div class="step-block">Matriz 3×3:<br>${matrixToHtml(mat, 'minor-matrix')}</div>`;

      html += `<div class="step-block">Termos positivos (a·e·i, b·f·g, c·d·h):<br>`;
      html += `&nbsp;&nbsp;1) ${a}·${e}·${i} = ${t1}<br>`;
      html += `&nbsp;&nbsp;2) ${b}·${f}·${g} = ${t2}<br>`;
      html += `&nbsp;&nbsp;3) ${c}·${d}·${h} = ${t3}<br>`;
      html += `&nbsp;&nbsp;Soma positivos = ${t1} + ${t2} + ${t3} = <strong>${sumPos}</strong></div>`;

      html += `<div class="step-block">Termos negativos (c·e·g, a·f·h, b·d·i):<br>`;
      html += `&nbsp;&nbsp;1) ${c}·${e}·${g} = ${s1}<br>`;
      html += `&nbsp;&nbsp;2) ${a}·${f}·${h} = ${s2}<br>`;
      html += `&nbsp;&nbsp;3) ${b}·${d}·${i} = ${s3}<br>`;
      html += `&nbsp;&nbsp;Soma negativos = ${s1} + ${s2} + ${s3} = <strong>${sumNeg}</strong></div>`;

      html += `<div class="step-block">Determinante = SomaPositivos - SomaNegativos = ${sumPos} - ${sumNeg} = <strong>${detValue}</strong></div>`;

      return { det: detValue, html };
    }

    // Caso n >= 4: aplicação da expansão de Laplace
    // Escolhemos a melhor linha (com mais zeros) para reduzir termos
    const row = chooseBestRow(mat);

    // Cabeçalho explicando a expansão de Laplace usada
    let html = `<div class="step-block">Usando expansão de Laplace pela linha ${row + 1} (índice ${row}):</div>`;
    html += `<div class="step-block">Matriz:<br>${matrixToHtml(mat, 'minor-matrix')}</div>`;

    // Iniciar o acumulador do determinante
    let detTotal = 0;

    // Abre um details para agrupar os termos da expansão
    html += `<div class="step-block">Expansão: det(A) = Σ (-1)^{${row+1}+j}·a_{${row+1},j}·det(M_{${row+1},j})</div>`;

    // Percorre colunas da linha escolhida
    for (let j = 0; j < n; j++) {
      const aij = mat[row][j]; // o elemento atual
      // Se elemento é zero, sua contribuição é zero (podemos registrar isso)
      if (aij === 0) {
        html += `<details><summary>Elemento a_${row+1}${j+1} = 0 → contribuição = 0 (ignoramos)</summary></details>`;
        continue;
      }

      // Calcula sinal do cofator: (-1)^{i+j}
      const sign = ((row + j) % 2 === 0) ? 1 : -1;
      const signStr = (sign === 1) ? '+' : '−';

      // Forma a submatriz (minor)
      const sub = minorMatrix(mat, row, j);

      // Calcula o determinante da submatriz recursivamente (obtendo também html)
      const subResult = detDetailed(sub); // {det, html}

      // Produto parcial: sinal * aij * det(sub)
      const partial = sign * aij * subResult.det;

      // Monta um bloco detalhado para essa contribuição
      html += `<details open><summary>Contribuição para j=${j+1}: a_${row+1}${j+1} = ${aij} → termo = ${signStr} ${aij}·det(M_${row+1}${j+1})</summary>`;
      html += `<div style="margin-left:12px;">`;
      html += `<div class="step-block">Submatriz M_${row+1}${j+1}:<br>${matrixToHtml(sub,'minor-matrix')}</div>`;
      html += `<div class="step-block">Cofator: (-1)^{${row+1}+${j+1}} = ${sign === 1 ? 1 : -1}</div>`;

      // Mostra o cálculo do determinante da submatriz (recursivo)
      html += `<div class="step-block">det(M_${row+1}${j+1}) = <div style="margin-left:8px;">${subResult.html}</div></div>`;

      // Mostra a multiplicação final do termo
      html += `<div class="step-block">Termo = ${sign === 1 ? '' : '-'}${aij} × (${subResult.det}) = <strong>${partial}</strong></div>`;

      html += `</div></details>`;

      // Acumula no total
      detTotal += partial;
    }

    // Resultado final deste nível
    html += `<div class="step-block"><strong>Acumulado (neste nível da expansão) = ${detTotal}</strong></div>`;

    return { det: detTotal, html };
  } // fim detDetailed

  // --- Função que dispara tudo e popula a interface ---
  function showStepsForMatrix(mat) {
    // Limpa área
    stepsArea.innerHTML = '';
    finalResult.style.display = 'none';
    miniResult.innerText = '';

    // Chama a rotina detalhada
    const result = detDetailed(mat); // {det, html}

    // Exibe o HTML gerado na área de passos
    stepsArea.innerHTML = result.html;

    // Exibe o resultado numérico no topo e no final
    miniResult.innerText = `Det(A) = ${result.det}`;
    finalResult.style.display = 'block';
    finalResult.innerHTML = `Determinante final: <span style="font-size:18px;color:#043e3a">${result.det}</span>`;
  }

  // --- Conecta botões ---
  btnCalc.addEventListener('click', function() {
    // Ao clicar, calcula e mostra passos
    showStepsForMatrix(A);
  });

  btnClear.addEventListener('click', function() {
    // Esconde passos e resultado
    stepsArea.innerHTML = '';
    finalResult.style.display = 'none';
    miniResult.innerText = '';
  });

  // (Opcional) calcular automaticamente ao abrir a página:
  // showStepsForMatrix(A);
