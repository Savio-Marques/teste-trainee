# Relatório Técnico - Sávio Marques de Souza

## 1. Visão Geral da Solução:

Olá, nesse teste técnico fui desafiado a diagnósticar e resolver alguns bugs da aplicação de Tarefas da IMTS com base no meu conhecimento e nos requisitos pedidos, conseguir organizar e
fazer com que alguma das funções principais do programa funcionassem como deviam, como iniciar a aplicação, duplicação de tarefas salvas, traduzir botão, ocultar e exibir tarefas, validações,
estilizações e entre outros.

---

## 2. Como Executar a Aplicação:

1.  **Clone o repositório** para sua máquina local.
    ```bash
    git clone git@github.com:Savio-Marques/teste-trainee.git
    ```
2.  **Instale as dependências** do projeto:
    ```bash
    npm install
    ```
3.  **Inicie o servidor** de desenvolvimento:
    ```bash
    npm start
    ```

---

## 3. Correção dos Erros Iniciais:

O não funcionamento do **npm start** era gerada inicialmente pela falta do script **"start": "ng serve"** no package.json, erro de digitação no componente HeaderComponent, anteriormente "HeadeComponent", e erro no caminho da biblioteca Font Awesome, além de um pequeno alerta de que o componente anterior citado era exportado para dois módulos diferentes, tudo foi resolvido através da leitura do stack trace, que indicava o erro e o módulo.

---

## 4. Relatório de Correção de Bugs e Melhorias:

### 4.1. Bugs corrigidos

Pontos corrigidos e suas soluções

1.  Ao clicar no botão “Salvar”, a tarefa está sendo adicionada duas vezes. <br>
    S: O erro era gerado apenas pela duplicação do código `this.todoService.addTodo(newTodo);` no new-task.component.ts.

2.  O texto do botão de limpar todas as tarefas não está em português. <br>
    S: Apenas alterei o clear All para Limpar Todos do getter `labelClearAll()`.

3.  O botão “Exibir Tarefas Concluídas” está, na verdade, ocultando as tarefas concluídas. <br>
    S: Criei um getter `displayedTodos()` em todo.components.ts que funciona como uma váriavel dinâmica que mostra ou filtra a lista selecionada, alteração também incluida do todo.component.html com alteração da funções.

4.  O botão “Ocultar Tarefas Concluídas” tem o comportamento invertido, exibindo as tarefas concluídas. <br>
    S: Mesma solução do item 4.

5.  Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário. <br> 
    S: adicionei um condicional com `confirm()` para confirmar a solicitação do usuários.

6.  O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas. <br>
    S: Alterei a de True para False a comparação da variável booleana em `clearCompletedTasks()` no arquivo todo.service.ts 

7.  O botão “Editar” está desalinhado e deve ser posicionado ao lado do botão “Remover”. <br>
    S: No todo-item.component.html adicionei uma div com a class buttons envolvolendo os butões de editar e salvar, e com css setei o display para flex e alinhei com justify-content.

8.  O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva. <br>
    S: Removi o estilo em linha aplicado no HTML.

9. A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas. <br>
    S: Com css fiz alterações no container da todo setando a altura das classes envolvidas, usando overflow: hidden para a barra de rolagem, e flex-grow: 1 para o container expandir.

10. Salvar sem digitar um “Título da Tarefa” está adicionando um item em branco à lista. <br>
    S: Em new-task.component.ts adiconei uma validação com condicional que que checa que se o campo está preenchido e com método `.trim()` verifica se está preenchido com o caracteres de espaço, caso alguma das duas caiam na validação, alerta o usuário e não adiciona a tarefa.

11. Digitar apenas espaços no campo “Título da Tarefa” e salvar também está adicionando um item em branco. <br>
    S: Mesma solução do item 11.

### 4.2. Melhorias Implementadas

1.  Permitir que o usuário adicione uma tarefa pressionando a tecla `Enter` no campo de texto, além do clique no botão “Salvar”. <br>
    S: no new-task.component.html adiconei na tag input o `(keyup.enter)="addTask()"` que possibilita adicionar a task com o Enter.

2.  Adicionar a funcionalidade de exportar a lista de tarefas atual para um arquivo PDF. (Sugestão de biblioteca: `https://github.com/parallax/jsPDF`). <br>
    S: Implentei a biblioteca sugerida que exporta o PDF de acordo com a configuração feita no todo.component.ts, como tive experincia com exportador de pdf em outros projetos pessoais, não foi algo tão desafiador, mas necessitei de ajuda da IA gemini.

---

## 5. Relatório de Débito Técnico:

### 5.1. Bugs não corrigidos:

1.  Só está sendo possível salvar uma tarefa a primeira vez que clica no botão “Salvar”, só é possível salvar uma nova tarefa após atualizar a página (F5) <br>
    R: Como não tenho conhecimento mais aprofudando em Angular, não conseguir achar a solução adequada para o problema, mas tentei ajustar a array de ToDos para que a cada tarefa adicionada  fosse implementada em outra array criada com as tarefas anteriores, e colocando a função `loadTodos()` em salvar, mas sem exitô.

2.  O botão “Editar” não está funcional. O comportamento esperado é: ao clicar, o campo “Título da Tarefa” deve ser preenchido com o texto da tarefa selecionada. Ao salvar, o item na lista deve ser atualizado e o campo de texto limpo. <br>
    R: Não consegui desenvolver a lógica de implementação para o botão de editar, além da falta de experiencia na linguagem angular que dificultou saber o funcionamento de cada componente.

### 5.2. Melhorias Não Implementadas:

1.  Implementar um botão “Ordenar de A a Z” que, ao ser clicado, ordene alfabeticamente a lista de tarefas visíveis. <br>
2.  Permitir a adição de múltiplas tarefas de uma só vez. O usuário deverá digitar os títulos separados pelo caractere `|` (pipe). <br>
    R: Apesar da pesquisa e da ideia de checar o incluide de "|" a string recebida do input, e quebrar com split, a falta de conhecimento sobre a linguagem dificultou a implementação lógica.
3.  Implementar um filtro de palavras obscenas. Caso o usuário tente cadastrar uma tarefa contendo um palavrão, exiba a mensagem: “Não é permitido cadastrar tarefas com palavras obscenas.” (Sugestão de biblioteca: `https://github.com/web-mech/badwords`).<br>
4.  Substituir todos os `alert`s e `confirm`s nativos do navegador por uma experiência mais moderna, utilizando a biblioteca SweetAlert. (Sugestão: `https://sweetalert2.github.io/`).<br>


---

## 6. Relatório de Melhorias:

Apesar de ser algo simples, a várias funcionaldiades que pensei enquanto resolvia os problemas:

1. Válidade de tarefas.
2. Categorias.
3. Arrastar e soltar.
4. Melhorias visuais.
5. Sistema de Login.
6. Responsividade.

---