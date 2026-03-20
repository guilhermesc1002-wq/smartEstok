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
}
