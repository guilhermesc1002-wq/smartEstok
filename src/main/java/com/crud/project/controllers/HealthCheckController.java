package com.crud.project.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller de Health Check e Informações da API
 *
 * Endpoints:
 * - GET /api/health → Status da aplicação
 * - GET /api/info → Informações da aplicação
 * - GET /api → Bem-vindo à API
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class HealthCheckController {


    /**
     * Health Check - Verifica se a aplicação está rodando
     * GET /api/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Aplicação está rodando com sucesso");
        response.put("timestamp", System.currentTimeMillis());
        response.put("mongodb", "Conectado");
        return ResponseEntity.ok(response);
    }

    /**
     * Informações da API
     * GET /api/info
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> response = new HashMap<>();
        response.put("appName", "SmartStock - Sistema de Estoque");
        response.put("version", "1.0.0");
        response.put("description", "API REST para gerenciamento de estoque e inventário");
        response.put("database", "MongoDB");
        response.put("springBootVersion", "4.0.3");
        response.put("javaVersion", "23.0.2");

        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("login", "POST /api/login");
        endpoints.put("health", "GET /api/health");
        endpoints.put("info", "GET /api/info");
        endpoints.put("usuarios", "GET /api/usuarios");
        endpoints.put("funcionarios", "GET /api/funcionarios");
        endpoints.put("gerentes", "GET /api/gerentes");
        endpoints.put("produtos", "GET /api/produtos");
        endpoints.put("fornecedores", "GET /api/fornecedores");
        endpoints.put("mercados", "GET /api/mercados");
        response.put("endpoints", endpoints);

        return ResponseEntity.ok(response);
    }

    /**
     * Bem-vindo à API
     * GET /api
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Bem-vindo à API SmartStock");
        response.put("description", "Sistema de gerenciamento de estoque");
        response.put("help", "Visite GET /api/info para ver todos os endpoints disponíveis");
        response.put("documentation", "/api/info");
        return ResponseEntity.ok(response);
    }

    /**
     * Root path - Redireciona para /api/info
     * GET /
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        return info();
    }
}

