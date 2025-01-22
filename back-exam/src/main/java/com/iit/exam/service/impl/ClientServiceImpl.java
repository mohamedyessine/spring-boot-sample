package com.iit.exam.service.impl;

import com.iit.exam.dao.ClientRepository;
import com.iit.exam.dto.ClientDTO;
import com.iit.exam.dto.ClientListDTO;
import com.iit.exam.exception.ResourceNotFoundException;
import com.iit.exam.mapper.ClientMapper;
import com.iit.exam.mapper.CompteMapper;
import com.iit.exam.models.Client;
import com.iit.exam.models.Compte;
import com.iit.exam.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository repository;
    private final ClientMapper mapper;
    private final CompteMapper compteMapper;

    @Override
    public ClientDTO createClient(ClientDTO dto) {
        Client client = mapper.toEntity(dto);
        client = repository.save(client);
        return mapper.toDTO(client);
    }

    @Override
    public ClientDTO createClientWithComptes(ClientDTO clientDTO) {
        Client client = mapper.toEntity(clientDTO);
        if (clientDTO.getComptes() != null) {
            Client finalClient = client;
            List<Compte> comptes = clientDTO.getComptes().stream()
                    .map(compteDTO -> {
                        Compte compte = compteMapper.toEntity(compteDTO);
                        compte.setClient(finalClient);
                        return compte;
                    })
                    .collect(Collectors.toList());
            client.setComptes(comptes);
        }

        client = repository.save(client);
        return mapper.toDTO(client);
    }

    @Override
    public ClientDTO updateClient(UUID id, ClientDTO dto) {
        // Fetch the existing client entity
        Client client = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        // Update only the specified fields (cin, firstName, lastName)
        if (dto.getCin() != null) {
            client.setCin(dto.getCin());
        }
        if (dto.getFirstName() != null) {
            client.setFirstName(dto.getFirstName());
        }
        if (dto.getLastName() != null) {
            client.setLastName(dto.getLastName());
        }

        // Avoid modifying the comptes list
        // Any update to comptes in dto is ignored

        // Save the updated client entity
        client = repository.save(client);

        // Convert the updated entity back to DTO
        return mapper.toDTO(client);
    }

    @Override
    public Optional<ClientDTO> getClientById(UUID id) {
        return repository.findById(id).map(mapper::toDTO);
    }

    @Override
    public void deleteClient(UUID id) {
        Client client = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
        repository.delete(client);
    }

    @Override
    public ClientListDTO getAllClients(int page, int size) {
        Page<Client> pageResult = repository.findAll(PageRequest.of(page, size));
        List<ClientDTO> dtos = mapper.toDTOList(pageResult.getContent());
        return ClientListDTO.builder()
                .clients(dtos)
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .build();
    }

}