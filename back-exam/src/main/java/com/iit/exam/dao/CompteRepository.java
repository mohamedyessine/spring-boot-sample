package com.iit.exam.dao;

import com.iit.exam.models.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompteRepository extends JpaRepository<Compte, UUID> {
}
