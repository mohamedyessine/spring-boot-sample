package com.iit.exam.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientListDTO {
    private List<ClientDTO> clients;
    private long totalElements;
    private int totalPages;
}
