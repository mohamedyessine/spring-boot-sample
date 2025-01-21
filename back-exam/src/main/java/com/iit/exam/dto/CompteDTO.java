package com.iit.exam.dto;

import lombok.*;

import java.util.UUID;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompteDTO {
    private UUID id;
    private String rib;
    private Double solde;
    private UUID clientId;
}
