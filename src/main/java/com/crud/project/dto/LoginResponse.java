package com.crud.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String id;
    private String email;
    private String nomeColaborador;
    private String cargo;
    private String tipo;
    private String mercadoId;
    private boolean ativo;
    private String token;
    private String message;

    // Getters explícitos
    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getNomeColaborador() {
        return nomeColaborador;
    }

    public String getCargo() {
        return cargo;
    }

    public String getTipo() {
        return tipo;
    }

    public String getMercadoId() {
        return mercadoId;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }

    // Setters explícitos
    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNomeColaborador(String nomeColaborador) {
        this.nomeColaborador = nomeColaborador;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setMercadoId(String mercadoId) {
        this.mercadoId = mercadoId;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Builder explícito para o IDE reconhecer
    public static LoginResponseBuilder builder() {
        return new LoginResponseBuilder();
    }

    // Classe auxiliar para o builder
    public static class LoginResponseBuilder {
        private String id;
        private String email;
        private String nomeColaborador;
        private String cargo;
        private String tipo;
        private String mercadoId;
        private boolean ativo;
        private String token;
        private String message;

        public LoginResponseBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LoginResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public LoginResponseBuilder nomeColaborador(String nomeColaborador) {
            this.nomeColaborador = nomeColaborador;
            return this;
        }

        public LoginResponseBuilder cargo(String cargo) {
            this.cargo = cargo;
            return this;
        }

        public LoginResponseBuilder tipo(String tipo) {
            this.tipo = tipo;
            return this;
        }

        public LoginResponseBuilder mercadoId(String mercadoId) {
            this.mercadoId = mercadoId;
            return this;
        }

        public LoginResponseBuilder ativo(boolean ativo) {
            this.ativo = ativo;
            return this;
        }

        public LoginResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        public LoginResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public LoginResponse build() {
            LoginResponse response = new LoginResponse();
            response.id = this.id;
            response.email = this.email;
            response.nomeColaborador = this.nomeColaborador;
            response.cargo = this.cargo;
            response.tipo = this.tipo;
            response.mercadoId = this.mercadoId;
            response.ativo = this.ativo;
            response.token = this.token;
            response.message = this.message;
            return response;
        }
    }
}
