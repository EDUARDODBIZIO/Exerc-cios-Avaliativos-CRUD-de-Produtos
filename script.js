const API = "http://127.0.0.1:4001";

let editandoId = null;
let timeout = null;

// ==============================
// DEBOUNCE (BUSCA AUTOMÁTICA)
// ==============================
document.getElementById("buscaFiltro").addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(buscar, 300);
});

// ==============================
// FORM SUBMIT (CREATE / UPDATE)
// ==============================
document.getElementById("formProduto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value,
        tipo: document.getElementById("tipo").value,
        status: document.getElementById("status").value,
        descricao: document.getElementById("descricao").value
    };

    try {

        let url = `${API}/equipamentos`;
        let method = "POST";

        if (editandoId) {
            url = `${API}/equipamentos/${editandoId}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!res.ok) {
            const err = await res.json();
            alert(err.erro || "Erro na operação");
            return;
        }

        alert(editandoId ? "Atualizado com sucesso" : "Criado com sucesso");

        editandoId = null;
        e.target.reset();

        buscar();

    } catch (err) {

        console.error("Erro:", err);
        alert("Erro ao conectar com o servidor");

    }
});

// ==============================
// BUSCAR (READ + FILTROS)
// ==============================
async function buscar() {

    const status = document.getElementById("statusFiltro").value;
    const tipo = document.getElementById("tipoFiltro").value;
    const busca = document.getElementById("buscaFiltro").value.trim();

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    loading.style.display = "block";
    error.innerText = "";

    try {

        let url = `${API}/equipamentos?`;

        if (status) url += `status=${status}&`;
        if (tipo) url += `tipo=${tipo}&`;
        if (busca) url += `busca=${encodeURIComponent(busca)}&`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();

        render(data.equipamentos, data.total);

    } catch (err) {

        console.error("Erro:", err);
        error.innerText = "Erro ao conectar com o servidor";

    } finally {

        loading.style.display = "none";
    }
}

// ==============================
// RENDER DA TABELA
// ==============================
function render(lista, total) {

    const tbody = document.getElementById("lista");
    const totalSpan = document.getElementById("total");

    tbody.innerHTML = "";

    lista.forEach(e => {

        tbody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.nome}</td>
                <td>${e.tipo}</td>
                <td>${e.status}</td>
                <td>${e.descricao}</td>
                <td>
                    <button onclick="editar(${e.id})">Editar</button>
                    <button onclick="excluir(${e.id})">Excluir</button>
                </td>
            </tr>
        `;
    });

    totalSpan.innerText = total;
}

// ==============================
// EDITAR
// ==============================
async function editar(id) {

    try {

        const res = await fetch(`${API}/equipamentos/${id}`);

        if (!res.ok) {
            throw new Error("Equipamento não encontrado");
        }

        const data = await res.json();

        document.getElementById("nome").value = data.nome;
        document.getElementById("tipo").value = data.tipo;
        document.getElementById("status").value = data.status;
        document.getElementById("descricao").value = data.descricao;

        editandoId = id;

    } catch (err) {

        console.error("Erro:", err);
        alert("Erro ao carregar equipamento");

    }
}

// ==============================
// EXCLUIR
// ==============================
async function excluir(id) {

    if (!confirm("Deseja realmente excluir?")) return;

    try {

        const res = await fetch(`${API}/equipamentos/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Erro ao excluir equipamento");
        }

        alert("Excluído com sucesso");

        buscar();

    } catch (err) {

        console.error("Erro:", err);
        alert("Erro ao excluir equipamento");

    }
}

// ==============================
// LIMPAR FILTROS
// ==============================
function limpar() {

    document.getElementById("statusFiltro").value = "";
    document.getElementById("tipoFiltro").value = "";
    document.getElementById("buscaFiltro").value = "";

    buscar();
}

// ==============================
// PRIMEIRA CARGA
// ==============================
buscar();