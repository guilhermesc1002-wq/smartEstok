/**
 * Manipulador de Autenticação
 * Trata eventos de login, logout e recuperação de senha
 */

import { apiService } from './api-service.js';

class AuthHandler {
  constructor() {
    this.isLoading = false;
  }

  /**
   * Configura listeners de formulários
   */
  configurarListeners() {
    // Formulário de login
    const formLogin = document.querySelector('form');
    if (formLogin && document.title.includes('Login')) {
      formLogin.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Formulário de recuperação de senha
    const formRecuperacao = document.querySelector('form');
    if (formRecuperacao && document.title.includes('Recuperar')) {
      formRecuperacao.addEventListener('submit', (e) => this.handleRecuperarSenha(e));
    }
  }

  /**
   * Manipula o login do usuário
   */
  async handleLogin(evento) {
    evento.preventDefault();

    if (this.isLoading) return;
    this.isLoading = true;

    try {
      const usuarioInput = document.getElementById('email');
      const senhaInput = document.getElementById('senha');

      if (!usuarioInput || !senhaInput) {
        this.exibirErro('Formulário incompleto');
        return;
      }

      const usuario = usuarioInput.value.trim();
      const senha = senhaInput.value;

      // Validação básica
      if (!usuario || !senha) {
        this.exibirErro('Usuário e senha são obrigatórios');
        return;
      }

      // Exibe carregamento
      const botao = evento.target.querySelector('button[type="submit"]');
      const textoOriginal = botao.textContent;
      botao.disabled = true;
      botao.textContent = 'Entrando...';

      // Realiza login
      const resposta = await apiService.login(usuario, senha);

      if (resposta.sucesso === false) {
        this.exibirErro(resposta.mensagem || 'Erro ao fazer login');
        botao.disabled = false;
        botao.textContent = textoOriginal;
        return;
      }

      // Login bem-sucedido
      this.exibirSucesso('Login realizado com sucesso!');

      // Aguarda um pouco antes de redirecionar
      setTimeout(() => {
        // Redireciona para dashboard ou página principal
        window.location.href = 'dashboard.html'; // Ajuste conforme necessário
      }, 1500);

    } catch (erro) {
      this.exibirErro(erro.message || 'Erro na comunicação com o servidor');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Manipula a recuperação de senha
   */
  async handleRecuperarSenha(evento) {
    evento.preventDefault();

    if (this.isLoading) return;
    this.isLoading = true;

    try {
      const emailInput = document.getElementById('email_recuperacao');

      if (!emailInput) {
        this.exibirErro('Campo de email não encontrado');
        return;
      }

      const email = emailInput.value.trim();

      // Validação de email
      if (!this.validarEmail(email)) {
        this.exibirErro('Email inválido');
        return;
      }

      // Exibe carregamento
      const botao = evento.target.querySelector('button[type="submit"]');
      const textoOriginal = botao.textContent;
      botao.disabled = true;
      botao.textContent = 'Enviando...';

      // Solicita recuperação de senha
      const resposta = await apiService.recuperarSenha(email);

      if (resposta.sucesso === false) {
        this.exibirErro(resposta.mensagem || 'Erro ao solicitar recuperação');
        botao.disabled = false;
        botao.textContent = textoOriginal;
        return;
      }

      // Sucesso
      this.exibirSucesso('Email de recuperação enviado com sucesso!');
      emailInput.value = '';

      // Redireciona após sucesso
      setTimeout(() => {
        window.location.href = 'tela_login.html';
      }, 2000);

    } catch (erro) {
      this.exibirErro(erro.message || 'Erro na comunicação com o servidor');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Valida formato de email
   */
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /**
   * Exibe mensagem de erro
   */
  exibirErro(mensagem) {
    this.exibirMensagem(mensagem, 'erro');
  }

  /**
   * Exibe mensagem de sucesso
   */
  exibirSucesso(mensagem) {
    this.exibirMensagem(mensagem, 'sucesso');
  }

  /**
   * Exibe mensagem genérica
   */
  exibirMensagem(mensagem, tipo = 'info') {
    // Remove mensagem anterior se existir
    const mensagemAnterior = document.querySelector('.mensagem-aviso');
    if (mensagemAnterior) {
      mensagemAnterior.remove();
    }

    // Cria elemento de mensagem
    const div = document.createElement('div');
    div.className = `mensagem-aviso mensagem-${tipo}`;
    div.textContent = mensagem;
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 4px;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-in-out;
      ${tipo === 'erro' ? 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
      ${tipo === 'sucesso' ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
      ${tipo === 'info' ? 'background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;' : ''}
    `;

    document.body.appendChild(div);

    // Remove após 5 segundos
    setTimeout(() => {
      div.style.animation = 'slideOut 0.3s ease-in-out';
      setTimeout(() => div.remove(), 300);
    }, 5000);
  }

  /**
   * Verifica se o usuário está logado
   */
  estaLogado() {
    return apiService.estaAutenticado();
  }

  /**
   * Realiza logout
   */
  async logout() {
    await apiService.logout();
    window.location.href = 'tela_login.html';
  }
}

// Instância única
const authHandler = new AuthHandler();

// Inicializa quando o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    authHandler.configurarListeners();
  });
} else {
  authHandler.configurarListeners();
}

export { authHandler, AuthHandler };

