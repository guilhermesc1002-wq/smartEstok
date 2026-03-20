package com.crud.project.Repository;

import com.crud.project.models.Mercado;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MercadoRepository extends MongoRepository<Mercado, String> {
    Optional<Mercado> findByNome(String nome);
}
