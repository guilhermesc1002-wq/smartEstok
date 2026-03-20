package com.crud.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO para resposta de importação de vendas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportacaoResultadoDTO {

    private String nomeArquivo;

    private String tipoArquivo; // CSV ou EXCEL

    private Integer totalRegistros;

    private Integer registrosComSucesso;

    private Integer registrosComErro;

    private String status; // CONCLUIDO ou ERRO

    private List<String> erros;

    private Double tempoProcessamento; // em segundos

    private String mensagem;
}

