package com.crud.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mercados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mercado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do mercado é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "CNPJ é obrigatório")
    @Column(nullable = false, length = 14, unique = true)
    private String cnpj;

    @NotBlank(message = "Endereço é obrigatório")
    @Column(nullable = false)
    private String endereco;

    @Email(message = "Email deve ser válido")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private boolean ativo = true;
}
