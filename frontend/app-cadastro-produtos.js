/**
 * Módulo para consumo da API de Cadastro de Produtos
 */

import { apiService } from './api-service.js';

// Obtém a URL da API do HTML
const API_URL = document.documentElement.getAttribute('data-api-url') || 
                document.body.getAttribute('data-api-url') ||
                'http://localhost:8080/api';

console.log('🌐 URL da API configurada:', API_URL);

// Elementos do DOM (serão inicializados no DOMContentLoaded)
let formCadastroProduto;
let btnCancelar;
let btnSalvar;
let nomeInput;
let descricaoInput;
let categoriaInput;
let fornecedorSelect;
let quantidadeInput;
let precoInput;

/**
 * Inicializa as referências dos elementos do DOM
 */
function inicializarElementosDOM() {
  console.log('🔧 Inicializando elementos do DOM...');
  
  formCadastroProduto = document.getElementById('formCadastroProduto');
  btnCancelar = document.getElementById('btnCancelar');
  btnSalvar = document.getElementById('btnSalvar');
  nomeInput = document.getElementById('nome_produto');
  descricaoInput = document.getElementById('descricao');
  categoriaInput = document.getElementById('categoria');
  fornecedorSelect = document.getElementById('fornecedorId');
  quantidadeInput = document.getElementById('quantidade');
  precoInput = document.getElementById('preco');
  
  console.log('📋 Elementos encontrados:');
  console.log('  - Form:', !!formCadastroProduto);
  console.log('  - Botão Cancelar:', !!btnCancelar);
  console.log('  - Botão Salvar:', !!btnSalvar);
  console.log('  - Nome Input:', !!nomeInput);
  console.log('  - Descrição Input:', !!descricaoInput);
  console.log('  - Categoria Input:', !!categoriaInput);
  console.log('  - Fornecedor Select:', !!fornecedorSelect);
  console.log('  - Quantidade Input:', !!quantidadeInput);
  console.log('  - Preço Input:', !!precoInput);
  
  // Validação de elementos
  if (!formCadastroProduto || !fornecedorSelect || !btnSalvar) {
    console.error('❌ Erro: Formulário, select de fornecedores ou botões não encontrados no DOM');
    exibirMensagem('erro', 'Erro ao inicializar o formulário');
    return false;
  }
  
  console.log('✅ Elementos do DOM inicializados com sucesso!');
  return true;
}

/**
 * Carrega lista de fornecedores na primeira carga
 */
async function carregarFornecedores() {
  try {
    console.log('🔄 Iniciando carregamento de fornecedores...');
    console.log(`📍 GET ${API_URL}/fornecedores`);
    
    const resposta = await apiService.obterFornecedores();
    
    console.log('✅ Resposta da API:', resposta);
    
    // O controller retorna List<Fornecedor> diretamente como array
    if (!Array.isArray(resposta)) {
      console.error('❌ Resposta não é um array:', typeof resposta);
      throw new Error('Formato de resposta inválido');
    }
    
    if (resposta.length > 0) {
      console.log(`✨ ${resposta.length} fornecedor(es) carregado(s)`);
      preencherSelectFornecedores(resposta);
    } else {
      console.warn('⚠️ Nenhum fornecedor encontrado');
      preencherSelectFornecedores([]);
    }
  } catch (erro) {
    console.error('❌ Erro ao carregar fornecedores:', erro);
    exibirMensagem('erro', 'Erro ao carregar fornecedores. Tente recarregar a página.');
  }
}

/**
 * Preenche o select de fornecedores com map
 * 
 * Formato esperado de cada fornecedor:
 * {
 *   "id": 1,
 *   "nome": "Forn Center",
 *   "telefone": "1122334455",
 *   "email": "contato@forncenter.com",
 *   "endereco": "Rua das Flores, 10",
 *   "cnpj": "12.345.678/0001-00"
 * }
 */
function preencherSelectFornecedores(fornecedores) {
  console.log('🎯 Preenchendo select com fornecedores:', fornecedores);
  
  // Limpa as opções existentes (mantém apenas o placeholder)
  fornecedorSelect.innerHTML = '<option value="">Selecione um fornecedor...</option>';
  
  const fornecedorHelp = document.getElementById('fornecedorHelp');
  
  if (!fornecedores || fornecedores.length === 0) {
    console.warn('⚠️ Nenhum fornecedor disponível');
    if (fornecedorHelp) {
      fornecedorHelp.textContent = '❌ Nenhum fornecedor disponível';
      fornecedorHelp.style.color = '#d9534f';
    }
    exibirMensagem('aviso', 'Nenhum fornecedor disponível. Cadastre um fornecedor primeiro.');
    return;
  }
  
  console.log(`✨ Adicionando ${fornecedores.length} fornecedor(es) ao select`);
  
  // Cria um DocumentFragment para melhor performance
  const fragment = document.createDocumentFragment();
  
  // Usa map para transformar fornecedores em elementos option
  const options = fornecedores.map(fornecedor => {
    const option = document.createElement('option');
    option.value = fornecedor.id;
    option.textContent = fornecedor.nome;
    console.log(`  ➕ ${fornecedor.nome} (ID: ${fornecedor.id})`);
    return option;
  });
  
  // Adiciona todos os options ao fragment
  options.forEach(option => {
    fragment.appendChild(option);
  });
  
  // Adiciona o fragment ao select de uma vez
  fornecedorSelect.appendChild(fragment);
  
  // Atualiza o data attribute e o help text
  fornecedorSelect.setAttribute('data-loading', 'false');
  if (fornecedorHelp) {
    fornecedorHelp.textContent = `✅ ${fornecedores.length} fornecedor(es) disponível(is)`;
    fornecedorHelp.style.color = '#5cb85c';
  }
  
  console.log('✅ Select preenchido com sucesso!');
}

/**
 * Coleta os dados do formulário
 */
function coletarDadosFormulario() {
  return {
    nome: nomeInput.value.trim(),
    descricao: descricaoInput.value.trim(),
    categoria: categoriaInput.value.trim(),
    fornecedorId: parseInt(fornecedorSelect.value) || null,
    quantidade: parseInt(quantidadeInput.value) || 0,
    preco: parseFloat(precoInput.value) || 0
  };
}

/**
 * Limpa o formulário
 */
function limparFormulario() {
  formCadastroProduto.reset();
  fornecedorSelect.value = '';
}

/**
 * Exibe mensagem de feedback para o usuário
 */
function exibirMensagem(tipo, mensagem) {
  // Remove mensagem anterior se existir
  const mensagemExistente = document.querySelector('.mensagem-feedback');
  if (mensagemExistente) {
    mensagemExistente.remove();
  }

  const divMensagem = document.createElement('div');
  divMensagem.className = `mensagem-feedback mensagem-${tipo}`;
  divMensagem.textContent = mensagem;
  
  // Insere a mensagem no início da main
  const main = document.querySelector('main');
  main.insertBefore(divMensagem, main.firstChild);

  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    divMensagem.remove();
  }, 5000);
}

/**
 * Valida os dados do formulário
 */
function validarDados(dados) {
  if (!dados.nome) {
    exibirMensagem('erro', 'Por favor, insira o nome do produto');
    return false;
  }

  if (!dados.descricao) {
    exibirMensagem('erro', 'Por favor, insira a descrição do produto');
    return false;
  }

  if (!dados.categoria) {
    exibirMensagem('erro', 'Por favor, insira a categoria do produto');
    return false;
  }

  if (!dados.fornecedorId) {
    exibirMensagem('erro', 'Por favor, selecione um fornecedor');
    return false;
  }

  if (dados.quantidade < 0) {
    exibirMensagem('erro', 'A quantidade não pode ser negativa');
    return false;
  }

  if (dados.preco <= 0) {
    exibirMensagem('erro', 'O preço deve ser maior que zero');
    return false;
  }

  return true;
}

/**
 * Handle do submit do formulário
 */
async function handleSubmitFormulario(evento) {
  evento.preventDefault();

  // Coleta e valida os dados
  const dados = coletarDadosFormulario();
  
  if (!validarDados(dados)) {
    return;
  }

  // Desabilita o botão durante o envio
  btnSalvar.disabled = true;
  btnSalvar.textContent = 'Salvando...';

  try {
    // Faz o consumo da API
    const resposta = await apiService.criarProduto(dados);

    if (resposta.id || (resposta.sucesso !== false && !resposta.erro)) {
      exibirMensagem('sucesso', 'Produto cadastrado com sucesso!');
      limparFormulario();
    } else {
      const mensagem = resposta.mensagem || resposta.message || resposta.error || 'Erro ao cadastrar o produto';
      exibirMensagem('erro', mensagem);
    }
  } catch (erro) {
    console.error('Erro ao cadastrar produto:', erro);
    exibirMensagem('erro', 'Erro ao conectar com o servidor. Tente novamente.');
  } finally {
    // Reabilita o botão
    btnSalvar.disabled = false;
    btnSalvar.textContent = 'Salvar';
  }
}

/**
 * Handle do botão cancelar
 */
function handleCancelar() {
  if (confirm('Deseja cancelar o cadastro? Todos os dados serão perdidos.')) {
    limparFormulario();
  }
}

/**
 * Inicializa os event listeners
 */
function inicializarEventListeners() {
  formCadastroProduto.addEventListener('submit', handleSubmitFormulario);
  btnCancelar.addEventListener('click', handleCancelar);
}

/**
 * Verifica autenticação ao carregar a página
 */
function verificarAutenticacao() {
  const estaAutenticado = apiService.estaAutenticado();
  console.log('🔐 Verificação de autenticação:', estaAutenticado ? '✅ Autenticado' : '❌ Não autenticado');
  
  if (!estaAutenticado) {
    console.warn('⚠️ Usuário não autenticado. Redirecionando para login em 3 segundos...');
    exibirMensagem('aviso', 'Você será redirecionado para login em poucos segundos');
    setTimeout(() => {
      console.log('➡️ Redirecionando para tela_login.html');
      window.location.href = 'tela_login.html';
    }, 3000);
    return false;
  }
  
  console.log('✅ Autenticação validada. Prosseguindo...');
  return true;
}

/**
 * Inicializa quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 ========== INICIALIZANDO CADASTRO DE PRODUTOS ==========');
  console.log(`📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}`);
  console.log(`🌐 API: ${API_URL}`);
  console.log(`🔗 Endpoint de fornecedores: ${API_URL}/fornecedores`);
  console.log(`🔗 Endpoint de produtos: ${API_URL}/produtos`);
  
  // Primeiro inicializa os elementos do DOM
  if (!inicializarElementosDOM()) {
    console.error('❌ Falha ao inicializar elementos do DOM');
    return;
  }
  
  // Depois verifica autenticação
  if (!verificarAutenticacao()) {
    console.warn('⚠️ Falha na verificação de autenticação');
    return;
  }
  
  // Inicializa os event listeners
  console.log('📌 Inicializando event listeners...');
  inicializarEventListeners();
  console.log('✅ Event listeners registrados');
  
  // Carrega os fornecedores
  console.log('📥 Iniciando carregamento de fornecedores...');
  carregarFornecedores();
  
  console.log('✅ ========== INICIALIZAÇÃO CONCLUÍDA ==========\n');
});
