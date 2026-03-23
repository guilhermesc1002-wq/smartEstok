/**
 * Configuração da API do Sistema de Estoque
 */

const API_CONFIG = {
  // URL base da API - Ajuste conforme necessário
  BASE_URL: 'http://localhost:8080/api',

  // Endpoints disponíveis
  ENDPOINTS: {
    // Health Check
    HEALTH: '/health',
    INFO: '/info',

    // Autenticação/Login
    LOGIN: '/login',
    LOGOUT: '/logout',
    RECUPERAR_SENHA: '/recuperar-senha',
    RECUPERAR_EMAIL: '/recuperar-email',
    VERIFICAR_EMAIL: '/verificar-email',
    REDEFINIR_SENHA: '/redefinir-senha',

    // Usuários
    USUARIOS: '/usuarios',
    USUARIOS_EMAIL: '/usuarios/email',

    // Produtos
    PRODUTOS: '/produtos',
    PRODUTOS_CATEGORIA: '/produtos/categoria',
    PRODUTOS_FORNECEDOR: '/produtos/fornecedor',

    // Fornecedores
    FORNECEDORES: '/fornecedores',
    FORNECEDORES_NOME: '/fornecedores/nome',
    FORNECEDORES_EMAIL: '/fornecedores/email',

    // Mercados
    MERCADOS: '/mercados',
    MERCADOS_NOME: '/mercados/nome',

    // Importação
    IMPORTACAO_CSV: '/importacao/csv',
    IMPORTACAO_EXCEL: '/importacao/excel',
  },

  // Timeout padrão (ms)
  TIMEOUT: 30000,

  // Configurações de retry
  RETRY: {
    MAX_TENTATIVAS: 3,
    DELAY: 1000
  },

  // Headers padrão
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Getter para URL completa de um endpoint
function getFullUrl(endpoint) {
  return API_CONFIG.BASE_URL + endpoint;
}

export { API_CONFIG, getFullUrl };

