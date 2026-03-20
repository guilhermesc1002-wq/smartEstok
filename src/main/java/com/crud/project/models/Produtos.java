package com.crud.project.models;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produtos {

    @Id
    private String id;

    @NotBlank(message = "Nome do produto é obrigatório")
    private String nome;

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @DecimalMin(value = "0.0", message = "Preço deve ser maior que 0")
    private Double preco;

    @Min(value = 0, message = "Quantidade não pode ser negativa")
    private int quantidade;

    @NotBlank(message = "Fornecedor é obrigatório")
    private String fornecedorId;

    private String categoria;
}
