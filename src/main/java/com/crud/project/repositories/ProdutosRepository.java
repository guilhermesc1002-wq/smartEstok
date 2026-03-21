package com.crud.project.repositories;

import com.crud.project.models.Produtos;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutosRepository extends MongoRepository<Produtos, String> {
    List<Produtos> findByCategoria(String categoria);
    List<Produtos> findByFornecedorId(String fornecedorId);
}

