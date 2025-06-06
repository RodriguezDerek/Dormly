package com.dormly.backend.repository;

import com.dormly.backend.model.Checklist;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ChecklistRepositoryTest {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Test
    void shouldFindChecklistByName() {
        //Given
        Checklist checklist = new Checklist(null, "Dorm Essentials", Collections.emptyList());
        checklistRepository.save(checklist);

        //When
        Optional<Checklist> result = checklistRepository.findByName("Dorm Essentials");

        //Then
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Dorm Essentials");
    }
}
