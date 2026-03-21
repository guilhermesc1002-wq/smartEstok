package com.crud.project.repositories;

import com.crud.project.models.Fornecedor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FornecedorRepository extends MongoRepository<Fornecedor, String> {
    Optional<Fornecedor> findByNome(String nome);
    Optional<Fornecedor> findByEmail(String email);
}

