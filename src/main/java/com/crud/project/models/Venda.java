package com.crud.project.models;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Modelo para Histórico de Vendas
 *
 * Armazena informações de cada venda realizada
 */
@Document(collection = "vendas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venda {

    @Id
    private String id;

    @NotBlank(message = "ID do produto é obrigatório")
    private String produtoId;

    @NotBlank(message = "Nome do produto é obrigatório")
    private String nomeProduto;

    @NotNull(message = "Quantidade vendida é obrigatória")
    @Min(value = 1, message = "Quantidade deve ser maior que 0")
    private Integer quantidadeVendida;

    @NotNull(message = "Preço unitário é obrigatório")
    @DecimalMin(value = "0.0", message = "Preço deve ser maior que 0")
    private Double precoUnitario;

    @NotNull(message = "Preço total é obrigatório")
    private Double precoTotal;

    @NotBlank(message = "Mercado ID é obrigatório")
    private String mercadoId;

    @NotBlank(message = "Nome do mercado é obrigatório")
    private String nomeMercado;

    @NotBlank(message = "Funcionário ID é obrigatório")
    private String funcionarioId;

    @NotBlank(message = "Nome do funcionário é obrigatório")
    private String nomeFuncionario;

    @NotNull(message = "Data da venda é obrigatória")
    private LocalDateTime dataVenda;

    private String categoria;

    private String observacoes;

    private String numeroNota; // Número da nota fiscal

    private boolean ativo = true;

    private LocalDateTime dataCriacao = LocalDateTime.now();

    private LocalDateTime dataAtualizacao = LocalDateTime.now();
}

