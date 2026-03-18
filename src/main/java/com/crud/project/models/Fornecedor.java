package com.crud.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fornecedores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do fornecedor é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "CNPJ é obrigatório")
    @Column(nullable = false, unique = true, length = 14)
    private String cnpj;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Column(nullable = false, length = 20)
    private String telefone;

    @NotBlank(message = "Endereço é obrigatório")
    @Column(nullable = false)
    private String endereco;

    @Column(length = 100)
    private String cidade;

    @Column(length = 2)
    private String estado;

    @Column(length = 8)
    private String cep;

    @Column(length = 500)
    private String observacoes;

    @Column(nullable = false)
    private boolean ativo = true;
}
