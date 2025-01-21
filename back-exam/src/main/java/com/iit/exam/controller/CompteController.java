package com.iit.exam.controller;

import com.iit.exam.dto.CompteDTO;
import com.iit.exam.dto.CompteListDTO;
import com.iit.exam.exception.ResourceNotFoundException;
import com.iit.exam.service.CompteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/comptes")
@RequiredArgsConstructor
@Validated
@Tag(name = "Compte Management", description = "Operations related to Compte Management")
public class CompteController {
    private final CompteService compteService;

    @PostMapping
    public ResponseEntity<CompteDTO> createCompte(@RequestBody @Valid CompteDTO dto) {
        CompteDTO created = compteService.createCompte(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompteDTO> updateCompte(
            @PathVariable UUID id,
            @RequestBody @Valid CompteDTO dto) {
        CompteDTO updated = compteService.updateCompte(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompteDTO> getCompteById(@PathVariable UUID id) {
        return compteService.getCompteById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Compte not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompte(@PathVariable UUID id) {
        compteService.deleteCompte(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<CompteListDTO> getAllComptes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(compteService.getAllComptes(page, size));
    }

}
