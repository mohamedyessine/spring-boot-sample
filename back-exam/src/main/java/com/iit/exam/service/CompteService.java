package com.iit.exam.service;


import com.iit.exam.dto.CompteDTO;
import com.iit.exam.dto.CompteListDTO;

import java.util.Optional;
import java.util.UUID;

public interface CompteService {
    CompteDTO createCompte(CompteDTO dto);

    CompteDTO updateCompte(UUID id, CompteDTO dto);

    Optional<CompteDTO> getCompteById(UUID id);

    void deleteCompte(UUID id);

    CompteListDTO getAllComptes(int page, int size);
}
