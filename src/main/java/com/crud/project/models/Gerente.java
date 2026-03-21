package com.crud.project.models;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "gerentes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gerente {

    private String id;

    @NotBlank(message = "Nome é obrigatório")
    private String nomeColaborador;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    @NotNull(message = "Cargo é obrigatório")
    private Cargos cargos;

    private String mercadoId;

    private boolean ativo = true;

    @NotBlank(message = "CPF é obrigatório")
    private String cpf;

    private String departamento;

    // Getters explícitos
    public String getId() {
        return id;
    }

    public String getNomeColaborador() {
        return nomeColaborador;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public Cargos getCargos() {
        return cargos;
    }

    public String getMercadoId() {
        return mercadoId;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public String getCpf() {
        return cpf;
    }

    public String getDepartamento() {
        return departamento;
    }

    // Setters explícitos
    public void setId(String id) {
        this.id = id;
    }

    public void setNomeColaborador(String nomeColaborador) {
        this.nomeColaborador = nomeColaborador;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setCargos(Cargos cargos) {
        this.cargos = cargos;
    }

    public void setMercadoId(String mercadoId) {
        this.mercadoId = mercadoId;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }
}
