package com.iit.exam.mapper;

import com.iit.exam.dto.ClientDTO;
import com.iit.exam.models.Client;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    ClientDTO toDTO(Client entity);

    Client toEntity(ClientDTO dto);

    List<ClientDTO> toDTOList(List<Client> entities);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDTO(ClientDTO clientDTO, @MappingTarget Client client);
}
