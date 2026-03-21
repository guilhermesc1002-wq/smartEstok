package com.crud.project.repositories;

import com.crud.project.models.Importacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ImportacaoRepository extends MongoRepository<Importacao, String> {
    List<Importacao> findByUsuarioId(String usuarioId);
    List<Importacao> findByTipoArquivo(String tipoArquivo);
    List<Importacao> findByDataImportacaoBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}

