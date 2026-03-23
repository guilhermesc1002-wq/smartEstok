/**
 * Serviço de Consumo da API
 * Responsável por todas as requisições HTTP para a API do sistema de estoque
 */

import { API_CONFIG, getFullUrl } from './api-config.js';

class APIService {
  constructor() {
    this.token = this.recuperarToken();
    this.interceptadores = [];
  }

  /**
   * Recupera o token armazenado no localStorage
   */
  recuperarToken() {
    return localStorage.getItem('auth_token') || null;
  }

  /**
   * Armazena o token no localStorage
   */
  armazenarToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Remove o token do localStorage
   */
  removerToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Prepara os headers da requisição
   */
  prepararHeaders() {
    const headers = { ...API_CONFIG.HEADERS };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Realiza uma requisição HTTP genérica
   */
  async requisicao(endpoint, opcoes = {}) {
    const url = getFullUrl(endpoint);
    
    // Mescla headers, priorizando os fornecidos em opcoes
    const headers = {
      ...this.prepararHeaders(),
      ...(opcoes.headers || {})
    };
    
    // Remove campo headers de opcoes para evitar duplicação
    const { headers: _, ...outrasOpcoes } = opcoes;
    
    const config = {
      headers,
      timeout: API_CONFIG.TIMEOUT,
      ...outrasOpcoes
    };

    try {
      const response = await fetch(url, config);

      // Trata resposta não autenticada
      if (response.status === 401) {
        this.removerToken();
        window.location.href = 'tela_login.html';
        throw new Error('Sessão expirada. Faça login novamente.');
      }

      // Processa a resposta
      const data = await this.processarResposta(response);
      return data;
    } catch (erro) {
      return this.tratarErro(erro);
    }
  }

  /**
   * Processa a resposta da API
   */
  async processarResposta(response) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const erro = new Error(data.message || `Erro HTTP ${response.status}`);
      erro.status = response.status;
      erro.dados = data;
      throw erro;
    }

    return data;
  }

  /**
   * Trata erros da requisição
   */
  tratarErro(erro) {
    console.error('Erro na requisição:', erro);

    const erroFormatado = {
      sucesso: false,
      mensagem: erro.message || 'Erro ao conectar com a API',
      status: erro.status || 0,
      dados: erro.dados || null
    };

    return erroFormatado;
  }

  /**
   * Adiciona um interceptador às requisições
   */
  adicionarInterceptador(funcao) {
    this.interceptadores.push(funcao);
  }

  /**
   * Remove o token e redireciona para login
   */
  redirecionarParaLogin() {
    this.removerToken();
    window.location.href = 'tela_login.html';
  }

  /**
   * Verifica se o usuário está autenticado
   */
  estaAutenticado() {
    return !!this.token;
  }

  // ============================================================================
  // HEALTH CHECK & INFO
  // ============================================================================

  /**
   * Health Check - Verifica se a API está funcionando
   * GET /api/health
   */
  async healthCheck() {
    return await this.requisicao(API_CONFIG.ENDPOINTS.HEALTH, {
      method: 'GET'
    });
  }

  /**
   * Obtém informações sobre a API
   * GET /api/info
   */
  async obterInfoAPI() {
    return await this.requisicao(API_CONFIG.ENDPOINTS.INFO, {
      method: 'GET'
    });
  }

  // ============================================================================
  // AUTENTICAÇÃO / LOGIN
  // ============================================================================

  /**
   * Realiza login
   * POST /api/login
   * Body: { "email": "user@example.com", "senha": "password123" }
   */
  async login(email, senha) {
    const resposta = await this.requisicao(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, senha })
    });

    if (resposta.token && resposta.sucesso !== false) {
      this.armazenarToken(resposta.token);
    }

    return resposta;
  }

  /**
   * Realiza logout
   * POST /api/logout
   */
  async logout() {
    await this.requisicao('/logout', {
      method: 'POST'
    });
    this.removerToken();
  }

  /**
   * Solicita recuperação de senha
   * POST /api/recuperar-senha
   * Body: { "email": "user@example.com" }
   */
  async recuperarSenha(email) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.RECUPERAR_SENHA, {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  /**
   * Recupera email pelo CPF
   * POST /api/recuperar-email
   * Body: { "cpf": "12345678900" }
   */
  async recuperarEmail(cpf) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.RECUPERAR_EMAIL, {
      method: 'POST',
      body: JSON.stringify({ cpf })
    });
  }

  /**
   * Verifica se um email é válido
   * POST /api/verificar-email
   * Body: { "email": "user@example.com" }
   */
  async verificarEmail(email) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.VERIFICAR_EMAIL, {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  /**
   * Redefine a senha do usuário
   * POST /api/redefinir-senha
   */
  async redefinirSenha(token, novaSenha, confirmacaoSenha) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.REDEFINIR_SENHA, {
      method: 'POST',
      body: JSON.stringify({
        token,
        novaSenha,
        confirmacaoSenha
      })
    });
  }

  // ============================================================================
  // USUÁRIOS
  // ============================================================================

  /**
   * Obtém lista de todos os usuários
   * GET /api/usuarios
   */
  async obterUsuarios() {
    return await this.requisicao(API_CONFIG.ENDPOINTS.USUARIOS, {
      method: 'GET'
    });
  }

  /**
   * Obtém um usuário específico por ID
   * GET /api/usuarios/{id}
   */
  async obterUsuarioPorId(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.USUARIOS}/${id}`, {
      method: 'GET'
    });
  }

  /**
   * Obtém um usuário por email
   * GET /api/usuarios/email/{email}
   */
  async obterUsuarioPorEmail(email) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.USUARIOS_EMAIL}/${email}`, {
      method: 'GET'
    });
  }

  /**
   * Cria um novo usuário
   * POST /api/usuarios
   * Body: { "nomeColaborador": "...", "email": "...", "senha": "...", ... }
   */
  async criarUsuario(dados) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.USUARIOS, {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Atualiza um usuário
   * PUT /api/usuarios/{id}
   */
  async atualizarUsuario(id, dados) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.USUARIOS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Deleta um usuário
   * DELETE /api/usuarios/{id}
   */
  async deletarUsuario(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.USUARIOS}/${id}`, {
      method: 'DELETE'
    });
  }

  // ============================================================================
  // PRODUTOS
  // ============================================================================

  /**
   * Obtém lista de todos os produtos
   * GET /api/produtos
   */
  async obterProdutos() {
    return await this.requisicao(API_CONFIG.ENDPOINTS.PRODUTOS, {
      method: 'GET'
    });
  }

  /**
   * Obtém um produto específico por ID
   * GET /api/produtos/{id}
   */
  async obterProdutoPorId(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.PRODUTOS}/${id}`, {
      method: 'GET'
    });
  }

  /**
   * Obtém produtos por categoria
   * GET /api/produtos/categoria/{categoria}
   */
  async obterProdutosPorCategoria(categoria) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.PRODUTOS_CATEGORIA}/${categoria}`, {
      method: 'GET'
    });
  }

  /**
   * Obtém produtos por fornecedor
   * GET /api/produtos/fornecedor/{fornecedorId}
   */
  async obterProdutosPorFornecedor(fornecedorId) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.PRODUTOS_FORNECEDOR}/${fornecedorId}`, {
      method: 'GET'
    });
  }

  /**
   * Cria um novo produto
   * POST /api/produtos
   */
  async criarProduto(dados) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.PRODUTOS, {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Atualiza um produto
   * PUT /api/produtos/{id}
   */
  async atualizarProduto(id, dados) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.PRODUTOS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Deleta um produto
   * DELETE /api/produtos/{id}
   */
  async deletarProduto(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.PRODUTOS}/${id}`, {
      method: 'DELETE'
    });
  }

  // ============================================================================
  // FORNECEDORES
  // ============================================================================

  /**
   * Obtém lista de todos os fornecedores
   * GET /api/fornecedores
   */
  async obterFornecedores() {
    return await this.requisicao(API_CONFIG.ENDPOINTS.FORNECEDORES, {
      method: 'GET'
    });
  }

  /**
   * Obtém um fornecedor específico por ID
   * GET /api/fornecedores/{id}
   */
  async obterFornecedorPorId(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.FORNECEDORES}/${id}`, {
      method: 'GET'
    });
  }

  /**
   * Obtém um fornecedor por nome
   * GET /api/fornecedores/nome/{nome}
   */
  async obterFornecedorPorNome(nome) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.FORNECEDORES_NOME}/${nome}`, {
      method: 'GET'
    });
  }

  /**
   * Obtém um fornecedor por email
   * GET /api/fornecedores/email/{email}
   */
  async obterFornecedorPorEmail(email) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.FORNECEDORES_EMAIL}/${email}`, {
      method: 'GET'
    });
  }

  /**
   * Cria um novo fornecedor
   * POST /api/fornecedores
   */
  async criarFornecedor(dados) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.FORNECEDORES, {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Atualiza um fornecedor
   * PUT /api/fornecedores/{id}
   */
  async atualizarFornecedor(id, dados) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.FORNECEDORES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Deleta um fornecedor
   * DELETE /api/fornecedores/{id}
   */
  async deletarFornecedor(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.FORNECEDORES}/${id}`, {
      method: 'DELETE'
    });
  }

  // ============================================================================
  // MERCADOS
  // ============================================================================

  /**
   * Obtém lista de todos os mercados
   * GET /api/mercados
   */
  async obterMercados() {
    return await this.requisicao(API_CONFIG.ENDPOINTS.MERCADOS, {
      method: 'GET'
    });
  }

  /**
   * Obtém um mercado específico por ID
   * GET /api/mercados/{id}
   */
  async obterMercadoPorId(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.MERCADOS}/${id}`, {
      method: 'GET'
    });
  }

  /**
   * Obtém um mercado por nome
   * GET /api/mercados/nome/{nome}
   */
  async obterMercadoPorNome(nome) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.MERCADOS_NOME}/${nome}`, {
      method: 'GET'
    });
  }

  /**
   * Cria um novo mercado
   * POST /api/mercados
   */
  async criarMercado(dados) {
    return await this.requisicao(API_CONFIG.ENDPOINTS.MERCADOS, {
      method: 'POST',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Atualiza um mercado
   * PUT /api/mercados/{id}
   */
  async atualizarMercado(id, dados) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.MERCADOS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados)
    });
  }

  /**
   * Deleta um mercado
   * DELETE /api/mercados/{id}
   */
  async deletarMercado(id) {
    return await this.requisicao(`${API_CONFIG.ENDPOINTS.MERCADOS}/${id}`, {
      method: 'DELETE'
    });
  }

  // ============================================================================
  // IMPORTAÇÃO
  // ============================================================================

  /**
   * Importa vendas de arquivo CSV
   * POST /api/importacao/csv
   * Form Data: { "file": arquivo CSV }
   */
  async importarCSV(arquivo) {
    const formData = new FormData();
    formData.append('file', arquivo);

    return await this.requisicao(API_CONFIG.ENDPOINTS.IMPORTACAO_CSV, {
      method: 'POST',
      headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : ''
      },
      body: formData
    });
  }

  /**
   * Importa vendas de arquivo EXCEL
   * POST /api/importacao/excel
   * Form Data: { "file": arquivo EXCEL (.xlsx) }
   */
  async importarExcel(arquivo) {
    const formData = new FormData();
    formData.append('file', arquivo);

    return await this.requisicao(API_CONFIG.ENDPOINTS.IMPORTACAO_EXCEL, {
      method: 'POST',
      headers: {
        'Authorization': this.token ? `Bearer ${this.token}` : ''
      },
      body: formData
    });
  }
}

// Instância única do serviço
const apiService = new APIService();

export { apiService, APIService };

 */
 * Responsável por todas as requisições HTTP para a API do sistema de estoque
 * Serviço de Consumo da API
