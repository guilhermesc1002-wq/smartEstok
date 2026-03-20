package com.crud.project.models;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mercados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mercado {

    @Id
    private String id;

    @NotBlank(message = "Nome do mercado é obrigatório")
    private String nome;

    @NotBlank(message = "Endereço é obrigatório")
    private String endereco;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    private String cidade;

    private String estado;
}
