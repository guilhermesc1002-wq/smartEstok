package com.crud.project.repositories;

import com.crud.project.models.Gerente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GerenteRepository extends MongoRepository<Gerente, String> {
    Optional<Gerente> findByEmail(String email);
    Optional<Gerente> findByCpf(String cpf);
}

