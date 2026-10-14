# Determinante — passo a passo

Projeto acadêmico de álgebra linear que exibe o cálculo de determinante por expansão de Laplace e regra de Sarrus.

## Tecnologias

- HTML
- CSS
- JavaScript

## Funcionalidades e utilização

Clique em Calcular e mostrar passos para acompanhar a resolução da matriz 4×4. Créditos da equipe permanecem na interface original.

## Como executar

```bash
git clone https://github.com/EuGeanCarlos/Matriz_calculo_de_determinate.git
cd Matriz_calculo_de_determinate
python -m http.server 8000 --directory "."
```

Requer Python 3 para o servidor local. Abra http://localhost:8000.

## Demonstração e publicação

Execução local. Nenhuma demonstração nova foi confirmada nesta etapa.

## Estrutura versionada

```text
README.md
index.html
script.js
style.css
```

## Status

Protótipo / projeto de estudo em desenvolvimento. A descrição acima distingue o que está implementado das dependências ou etapas pendentes.

## Autor e créditos

**Gean Carlos** — estudante de Engenharia de Computação, UEMA.

[GitHub](https://github.com/EuGeanCarlos)

Licenças, autoria compartilhada e atribuições existentes no código e nos materiais originais permanecem aplicáveis.

---

## Documentação original e contexto

O material original a seguir preserva contexto, créditos e planejamento. Para execução e limitações atuais, considere as seções de auditoria acima.

    Trabalho acadêmico:
    Instituição: Universidade Estadual do Maranhão - UEMA
    Curso: Engenharia da Computação
    Matéria: Geometria Analítica e Geometria Analítica e Álgebra Linear
    PROJETO: Mostrar passo a passo do cálculo da determinante de uma matriz.
    OBJETIVO:
    - Exibir a matriz 4x4 no front-end.
    - Escolher automaticamente a melhor linha/coluna (mais zeros) para expandir.
    - Gerar um relatório detalhado em HTML com:
        • fórmula de Laplace aplicada,
        • formação de submatrizes (minors),
        • cálculo detalhado do determinante 3×3 por Sarrus,
        • e a combinação final que gera o valor numérico.
   
    Observação: o código é genérico o suficiente para matrizes quadradas (tratando
    casos base 1×1, 2×2 e 3×3 com detalhes).
   
