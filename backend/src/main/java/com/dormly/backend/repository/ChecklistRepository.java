package com.dormly.backend.repository;

import com.dormly.backend.model.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    Optional<Checklist> findByName(String name);
}
