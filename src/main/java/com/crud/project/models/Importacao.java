package com.crud.project.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Modelo para registro de Importações
 *
 * Armazena metadados sobre cada importação realizada
 */
@Document(collection = "importacoes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Importacao {

    @Id
    private String id;

    private String nomeArquivo;

    private String tipoArquivo; // CSV, EXCEL, JSON

    private String usuarioId;

    private String nomeUsuario;

    private LocalDateTime dataImportacao = LocalDateTime.now();

    private Integer totalRegistros = 0;

    private Integer registrosComSucesso = 0;

    private Integer registrosComErro = 0;

    private String status; // PENDENTE, PROCESSANDO, CONCLUIDO, ERRO

    private String mensagemErro;

    private Double tempoProcessamento; // em segundos

    private String descricao;

    private boolean ativo = true;
}

