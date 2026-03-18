package com.crud.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "produtos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do produto é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "Código de barras é obrigatório")
    @Column(nullable = false, unique = true, length = 20)
    private String codigoBarras;

    @NotBlank(message = "Categoria é obrigatória")
    @Column(nullable = false)
    private String categoria;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @NotNull(message = "Quantidade em estoque é obrigatória")
    @Min(value = 0, message = "Quantidade não pode ser negativa")
    @Column(nullable = false)
    private Integer quantidadeEstoque;

    @NotNull(message = "Quantidade mínima é obrigatória")
    @Min(value = 0, message = "Quantidade mínima não pode ser negativa")
    @Column(nullable = false)
    private Integer quantidadeMinima;

    @NotNull(message = "Data de vencimento é obrigatória")
    @Column(nullable = false)
    private LocalDate dataVencimento;

    @NotNull(message = "Data de entrada é obrigatória")
    @Column(nullable = false)
    private LocalDate dataEntrada;

    @ManyToOne
    @JoinColumn(name = "mercado_id", nullable = false)
    private Mercado mercado;

    @Column(nullable = false)
    private boolean ativo = true;
}
