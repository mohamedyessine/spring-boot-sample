package com.iit.exam.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompteListDTO {
    private List<CompteDTO> comptes;
    private long totalElements;
    private int totalPages;
}
