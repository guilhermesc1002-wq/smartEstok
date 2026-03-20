package com.crud.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String id;
    private String email;
    private String nomeColaborador;
    private String cargo;
    private String tipo;
    private String mercadoId;
    private boolean ativo;
    private String token;
    private String message;
}

