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

    // Getters explícitos
    public String getId() {
        return id;
    }

    public String getProdutoId() {
        return produtoId;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public Integer getQuantidadeVendida() {
        return quantidadeVendida;
    }

    public Double getPrecoUnitario() {
        return precoUnitario;
    }

    public Double getPrecoTotal() {
        return precoTotal;
    }

    public String getMercadoId() {
        return mercadoId;
    }

    public String getNomeMercado() {
        return nomeMercado;
    }

    public String getFuncionarioId() {
        return funcionarioId;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public LocalDateTime getDataVenda() {
        return dataVenda;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public String getNumeroNota() {
        return numeroNota;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    // Setters explícitos
    public void setId(String id) {
        this.id = id;
    }

    public void setProdutoId(String produtoId) {
        this.produtoId = produtoId;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public void setQuantidadeVendida(Integer quantidadeVendida) {
        this.quantidadeVendida = quantidadeVendida;
    }

    public void setPrecoUnitario(Double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public void setPrecoTotal(Double precoTotal) {
        this.precoTotal = precoTotal;
    }

    public void setMercadoId(String mercadoId) {
        this.mercadoId = mercadoId;
    }

    public void setNomeMercado(String nomeMercado) {
        this.nomeMercado = nomeMercado;
    }

    public void setFuncionarioId(String funcionarioId) {
        this.funcionarioId = funcionarioId;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public void setDataVenda(LocalDateTime dataVenda) {
        this.dataVenda = dataVenda;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public void setNumeroNota(String numeroNota) {
        this.numeroNota = numeroNota;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
}
