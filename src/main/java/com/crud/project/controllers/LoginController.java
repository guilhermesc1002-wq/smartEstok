package com.crud.project.controllers;

import com.crud.project.dto.LoginRequest;
import com.crud.project.dto.LoginResponse;
import com.crud.project.services.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AuthenticationService authenticationService;

    /**
     * Endpoint de Login
     * POST /api/login
     * Body: { "email": "user@example.com", "senha": "password123" }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authenticationService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Falha no login", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro no servidor", e.getMessage()));
        }
    }

    /**
     * Endpoint para recuperar senha
     * POST /api/recuperar-senha
     * Body: { "email": "user@example.com" }
     */
    @PostMapping("/recuperar-senha")
    public ResponseEntity<?> recuperarSenha(@RequestBody EmailRequest emailRequest) {
        try {
            boolean exists = authenticationService.emailExists(emailRequest.getEmail());
            if (exists) {
                // TODO: Implementar lógica de envio de email com token de recuperação
                return ResponseEntity.ok(new MessageResponse("Email de recuperação de senha foi enviado"));
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Usuário não encontrado", "Não há usuário registrado com este email"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao processar requisição", e.getMessage()));
        }
    }

    /**
     * Endpoint para recuperar email
     * POST /api/recuperar-email
     * Body: { "cpf": "12345678900" }
     */
    @PostMapping("/recuperar-email")
    public ResponseEntity<?> recuperarEmail(@RequestBody CpfRequest cpfRequest) {
        try {
            // TODO: Implementar lógica de busca por CPF
            return ResponseEntity.ok(new MessageResponse("Email do colaborador foi enviado para o celular registrado"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao processar requisição", e.getMessage()));
        }
    }

    // Classes auxiliares para respostas
    public static class ErrorResponse {
        public String error;
        public String message;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
        }

        public String getError() { return error; }
        public String getMessage() { return message; }
    }

    public static class MessageResponse {
        public String message;

        public MessageResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
    }

    public static class EmailRequest {
        public String email;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class CpfRequest {
        public String cpf;
        public String getCpf() { return cpf; }
        public void setCpf(String cpf) { this.cpf = cpf; }
    }
}

