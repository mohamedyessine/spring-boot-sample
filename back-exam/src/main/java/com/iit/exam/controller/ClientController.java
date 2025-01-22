package com.iit.exam.controller;

import com.iit.exam.dto.ClientDTO;
import com.iit.exam.dto.ClientListDTO;
import com.iit.exam.exception.ResourceNotFoundException;
import com.iit.exam.service.ClientService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/clients")
@RequiredArgsConstructor
@Validated
@Tag(name = "Client Management", description = "Operations related to Client Management")
public class ClientController {
    private final ClientService service;

    @PostMapping
    public ResponseEntity<ClientDTO> createClient(@RequestBody @Valid ClientDTO dto) {
        ClientDTO created = service.createClient(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/with-comptes")
    public ResponseEntity<ClientDTO> createClientWithComptes(@RequestBody @Valid ClientDTO clientDTO) {
        ClientDTO createdClient = service.createClientWithComptes(clientDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(
            @PathVariable UUID id,
            @RequestBody @Valid ClientDTO dto) {
        ClientDTO updated = service.updateClient(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable UUID id) {
        return service.getClientById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable UUID id) {
        service.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<ClientListDTO> getAllClients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getAllClients(page, size));
    }

}