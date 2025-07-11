const form = document.getElementById("formCadastro")
const campos = {
  nome: document.getElementById("nome"),
  usuario: document.getElementById("usuario"),
  senha: document.getElementById("senha"),
  email: document.getElementById("email"),
  dataNascimento: document.getElementById("dataNascimento"),
}

const erros = {
  nome: document.getElementById("erroNome"),
  usuario: document.getElementById("erroUsuario"),
  senha: document.getElementById("erroSenha"),
  email: document.getElementById("erroEmail"),
  dataNascimento: document.getElementById("erroDataNascimento"),
}

const mensagemSucesso = document.getElementById("mensagemSucesso")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  limparErros()
  mensagemSucesso.style.display = "none"
  mensagemSucesso.textContent = ""

  try {
    validarCampos()
    mensagemSucesso.style.display = "block"
    mensagemSucesso.textContent = "Cadastro realizado com sucesso!"
    form.reset()
  } catch (erro) {
    if (erro.campo && erros[erro.campo]) {
      erros[erro.campo].textContent = erro.message
    } else {
      alert("Erro inesperado: " + erro.message)
    }
  }
})

function limparErros() {
  Object.values(erros).forEach(el => el.textContent = "")
}

function validarCampos() {
  if (!campos.nome.value.trim()) {
    throw { campo: "nome", message: "Nome é obrigatório." }
  }

  if (!campos.usuario.value.trim()) {
    throw { campo: "usuario", message: "Usuário é obrigatório." }
  }

  if (!campos.senha.value.trim()) {
    throw { campo: "senha", message: "Senha é obrigatória." }
  }

  if (!campos.email.value.trim()) {
    throw { campo: "email", message: "Email é obrigatório." }
  }

  if (!validarEmail(campos.email.value.trim())) {
    throw { campo: "email", message: "Email inválido." }
  }

  if (!campos.dataNascimento.value) {
    throw { campo: "dataNascimento", message: "Data de nascimento é obrigatória." }
  }

  if (!maiorOuIgual18(campos.dataNascimento.value)) {
    throw { campo: "dataNascimento", message: "Você deve ter 18 anos ou mais." }
  }
}

function validarEmail(email) {
  // Regexp simples para validação básica
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function maiorOuIgual18(dataNasc) {
  const hoje = new Date()
  const nascimento = new Date(dataNasc)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const m = hoje.getMonth() - nascimento.getMonth()
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }
  return idade >= 18
}
