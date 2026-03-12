package com.crud.project.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.annotation.Repeatable;

@RestController("/")
public class LoginController {

    @RequestMapping("login")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok().body("Login feito com sucesso");
    }

    @RequestMapping("esqueciminhasenha")
    public ResponseEntity<?> recuperarSenha() {
        return ResponseEntity.ok().body("Senha atualizada foi endereçada ao email registrado.");
    }

    @RequestMapping("recuperaremail")
    public ResponseEntity<?> recuperarEmail() {
        return ResponseEntity.ok().body("Email do colaborador recuperado com sucesso!");
    }
}
