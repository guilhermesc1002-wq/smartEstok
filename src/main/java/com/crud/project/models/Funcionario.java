package com.crud.project.models;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "funcionarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {

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

    @Min(value = 0, message = "Idade não pode ser negativa")
    @Max(value = 150, message = "Idade deve ser realista")
    private int idade;
}
