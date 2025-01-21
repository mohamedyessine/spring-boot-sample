package com.iit.exam.service.impl;

import com.iit.exam.dao.ClientRepository;
import com.iit.exam.dao.CompteRepository;
import com.iit.exam.dto.CompteDTO;
import com.iit.exam.dto.CompteListDTO;
import com.iit.exam.exception.ResourceNotFoundException;
import com.iit.exam.mapper.CompteMapper;
import com.iit.exam.models.Client;
import com.iit.exam.models.Compte;
import com.iit.exam.service.CompteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class CompteServiceImpl implements CompteService {
    private final CompteRepository compteRepository;
    private final CompteMapper compteMapper;
    private final ClientRepository clientRepository;

    @Override
    public CompteDTO createCompte(CompteDTO dto) {
        Client client =  clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        Compte compte = compteMapper.toEntity(dto);
        compte.setClient(client);

        compte = compteRepository.save(compte);
        return compteMapper.toDTO(compte);
    }

    @Override
    public CompteDTO updateCompte(UUID id, CompteDTO dto) {
        Compte compte = compteMapper.toEntity(dto);
        Client client =  clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        compte.setClient(client);
        compteMapper.updateEntityFromDTO(dto, compte);
        compte = compteRepository.save(compte);
        return compteMapper.toDTO(compte);

    }

    @Override
    public Optional<CompteDTO> getCompteById(UUID id) {
        return compteRepository.findById(id).map(compteMapper::toDTO);
    }

    @Override
    public void deleteCompte(UUID id) {
        Compte compte = compteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Compte not found"));
        compteRepository.delete(compte);
    }

    @Override
    public CompteListDTO getAllComptes(int page, int size) {
        Page<Compte> pageResult = compteRepository.findAll(PageRequest.of(page, size));
        List<CompteDTO> compteDTOS = compteMapper.toDTOList(pageResult.getContent());
        return CompteListDTO.builder()
                .comptes(compteDTOS)
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .build();
    }
}
