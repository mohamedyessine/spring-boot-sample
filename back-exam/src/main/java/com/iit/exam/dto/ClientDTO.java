package com.iit.exam.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDTO {
    private UUID id;
    private String cin;
    private String firstName;
    private String lastName;
    private List<CompteDTO> comptes;
}