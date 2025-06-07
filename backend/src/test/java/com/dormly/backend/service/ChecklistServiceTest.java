package com.dormly.backend.service;

import com.dormly.backend.DTO.ChecklistResponse;
import com.dormly.backend.DTO.GenericResponse;
import com.dormly.backend.exception.checklists.ChecklistAlreadyExistsException;
import com.dormly.backend.exception.checklists.ChecklistDoesNotExistException;
import com.dormly.backend.model.Checklist;
import com.dormly.backend.repository.ChecklistRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ChecklistServiceTest {

    @Mock
    private ChecklistRepository checklistRepository;

    @InjectMocks
    private ChecklistService checklistService;

    @Test // createChecklist — Success Case
    void shouldCreateChecklistWhenNameDoesNotExist(){
        //Given
        String name = "Bathroom Supplies";
        when(checklistRepository.findByName(name)).thenReturn(Optional.empty());

        //When
        GenericResponse response = checklistService.createChecklist(name);

        //Then
        assertThat(response.getMessage()).isEqualTo("Checklist created successfully.");
        assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED.value());
        verify(checklistRepository, times(1)).save(any(Checklist.class));
    }

    @Test // createChecklist — Failure Case
    void shouldThrowExceptionWhenChecklistNameAlreadyExists(){
        //Given
        String name = "Bathroom Supplies";
        Checklist existingChecklist = new Checklist(1L, name, Collections.emptyList());
        when(checklistRepository.findByName(name)).thenReturn(Optional.of(existingChecklist));

        //When / Then
        assertThatThrownBy(() -> checklistService.createChecklist(name))
                .isInstanceOf(ChecklistAlreadyExistsException.class)
                .hasMessage("Checklist name already exists.");
    }

    @Test // getAllChecklists
    void shouldReturnAllChecklists(){
        //Given
        Checklist checklistOne = new Checklist(1L, "School Supplies", Collections.emptyList());
        Checklist checklistTwo = new Checklist(2L, "Kitchen Pans", Collections.emptyList());
        List<Checklist> checklistList = List.of(checklistOne, checklistTwo);
        when(checklistRepository.findAll()).thenReturn(checklistList);

        //When
        ChecklistResponse response = checklistService.getAllChecklists();

        //Then
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getChecklistList()).hasSize(2).contains(checklistOne, checklistTwo);
    }

    @Test // deleteChecklist — Success Case
    void shouldDeleteChecklistWhenIdExists(){
        //Given
        Long id = 1L;
        Checklist checklistToDelete = new Checklist(id, "Trash Bags", Collections.emptyList());
        when(checklistRepository.findById(id)).thenReturn(Optional.of(checklistToDelete));

        //When
        GenericResponse response = checklistService.deleteChecklist(id);

        //Then
        assertThat(response.getMessage()).isEqualTo("Checklist deleted successfully.");
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        verify(checklistRepository).delete(checklistToDelete);
    }

    @Test // deleteChecklist — Failure Case
    void shouldThrowExceptionWhenChecklistIdDoesNotExist(){
        //Given
        Long id = 99L;
        when(checklistRepository.findById(id)).thenReturn(Optional.empty());

        //When / Then
        assertThatThrownBy(() -> checklistService.deleteChecklist(id))
                .isInstanceOf(ChecklistDoesNotExistException.class)
                .hasMessage("Checklist does not exist.");
    }
}
