package com.iit.exam.mapper;

import com.iit.exam.dto.CompteDTO;
import com.iit.exam.models.Compte;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CompteMapper {
    @Mapping(source = "client.id", target = "clientId")
    CompteDTO toDTO(Compte entity);

    @Mapping(source = "clientId", target = "client.id")
    Compte toEntity(CompteDTO dto);

    List<CompteDTO> toDTOList(List<Compte> entities);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDTO(CompteDTO compteDTO, @MappingTarget Compte compte);
}
