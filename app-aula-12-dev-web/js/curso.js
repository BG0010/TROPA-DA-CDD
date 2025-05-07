document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cursoForm");
    const tabela = document.getElementById("cursoTabela");
    const modal = document.getElementById("modal");
    const modalNome = document.getElementById("modalNome");
    const modalDuracao = document.getElementById("modalDuracao");
    const modalDescricao = document.getElementById("modalDescricao");
    const closeModal = document.querySelector(".close");

    let cursos = [];
    let cursoEditando = null; // Armazena o índice do curso que está sendo editado

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const cursoId = document.getElementById("idCurso").value.trim();
        const nomeCurso = document.getElementById("cursoNome").value.trim();
        const duracaoCurso = document.getElementById("cursoDuracao").value.trim();
        const descricaoCurso = document.getElementById("cursoDescricao").value.trim();

        if (!cursoId || !nomeCurso || !duracaoCurso || !descricaoCurso) {
            alert("Preencha todos os campos!");
            return;
        }

        if (cursoEditando !== null) {
            // Se estiver editando, atualiza os dados do curso existente
            cursos[cursoEditando] = {
                id: cursoId,
                nome: nomeCurso,
                duracao: duracaoCurso,
                descricao: descricaoCurso,
            };
            cursoEditando = null; // Sai do modo de edição
            document.querySelector(".cursoSubmit").textContent = "Adicionar Curso"; // Volta ao botão original
        } else {
            // Adiciona um novo curso
            cursos.push({
                id: cursoId,
                nome: nomeCurso,
                duracao: duracaoCurso,
                descricao: descricaoCurso,
            });
        }

        atualizarTabela();
        form.reset();
    });

    function atualizarTabela() {
        tabela.innerHTML = ""; 

        cursos.forEach((curso, index) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${curso.id}</td>
                <td>${curso.nome}</td>
                <td>${curso.duracao} horas</td>
                <td>
                    <button class="details-btn">Detalhes</button>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;

            // Exibir detalhes do curso na modal
            linha.querySelector(".details-btn").addEventListener("click", function () {
                abrirModal(curso.id, curso.nome, curso.duracao, curso.descricao);
            });

            // Editar curso
            linha.querySelector(".edit-btn").addEventListener("click", function () {
                editarCurso(index);
            });

            // Remover curso
            linha.querySelector(".delete-btn").addEventListener("click", function () {
                excluirCurso(index);
            });

            tabela.appendChild(linha);
        });
    }

    function abrirModal(id, nome, duracao, descricao) {
        document.getElementById("modalId").textContent = id;
        modalNome.textContent = nome;
        modalDuracao.textContent = duracao;
        modalDescricao.textContent = descricao;
        modal.style.display = "flex";
    }

    function editarCurso(index) {
        const curso = cursos[index];

        document.getElementById("cursoId").value = curso.id;
        document.getElementById("cursoNome").value = curso.nome;
        document.getElementById("cursoDuracao").value = curso.duracao;
        document.getElementById("cursoDescricao").value = curso.descricao;

        cursoEditando = index; // Define o curso que está sendo editado
        document.querySelector(".cursoSubmit").textContent = "Salvar Alterações";
    }

    function excluirCurso(index) {
        if (confirm("Tem certeza que deseja excluir este curso?")) {
            cursos.splice(index, 1);
            atualizarTabela();
        }
    }

    // Fechar a modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Fechar ao clicar fora da modal
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
