package com.iit.exam.service;

import com.iit.exam.dto.ClientDTO;
import com.iit.exam.dto.ClientListDTO;

import java.util.Optional;
import java.util.UUID;

public interface ClientService {
    ClientDTO createClient(ClientDTO dto);

    ClientDTO createClientWithComptes(ClientDTO clientDTO);


    ClientDTO updateClient(UUID id, ClientDTO dto);

    Optional<ClientDTO> getClientById(UUID id);

    void deleteClient(UUID id);

    ClientListDTO getAllClients(int page, int size);

}
