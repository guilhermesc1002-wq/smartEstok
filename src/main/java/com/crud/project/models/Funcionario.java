package com.crud.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "funcionarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario extends Usuario {

    @NotBlank(message = "CPF é obrigatório")
    @Column(nullable = false, length = 11, unique = true)
    private String cpf;

    @Min(value = 0, message = "Idade não pode ser negativa")
    @Max(value = 150, message = "Idade deve ser realista")
    @Column(nullable = false)
    private int idade;
}
