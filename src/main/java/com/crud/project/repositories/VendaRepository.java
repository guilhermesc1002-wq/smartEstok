package com.crud.project.repositories;

import com.crud.project.models.Venda;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VendaRepository extends MongoRepository<Venda, String> {
    List<Venda> findByProdutoId(String produtoId);
    List<Venda> findByMercadoId(String mercadoId);
    List<Venda> findByDataVendaBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}

