package com.crud.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gerentes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gerente extends Usuario {

    @NotBlank(message = "Departamento é obrigatório")
    @Column(nullable = false)
    private String departamento;
}
