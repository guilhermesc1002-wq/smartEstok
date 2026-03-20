package com.crud.project.Repository;

import com.crud.project.models.Produtos;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutosRepository extends MongoRepository<Produtos, String> {
    Optional<Produtos> findByNome(String nome);
    List<Produtos> findByFornecedorId(String fornecedorId);
    List<Produtos> findByCategoria(String categoria);
}
