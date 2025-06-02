package com.dormly.backend.service;

import com.dormly.backend.DTO.ChecklistResponse;
import com.dormly.backend.DTO.GenericResponse;
import com.dormly.backend.exception.checklists.ChecklistAlreadyExistsException;
import com.dormly.backend.exception.checklists.ChecklistDoesNotExistException;
import com.dormly.backend.model.Checklist;
import com.dormly.backend.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    public GenericResponse createChecklist(String name) {
        Optional<Checklist> optionalChecklist = checklistRepository.findByName(name);

        if(optionalChecklist.isEmpty()){
            Checklist checklist = new Checklist();
            checklist.setName(name);
            checklistRepository.save(checklist);

            return GenericResponse.builder()
                    .message("Checklist created successfully.")
                    .status(HttpStatus.CREATED.value())
                    .build();
        }

        throw new ChecklistAlreadyExistsException("Checklist name already exists.");
    }

    public ChecklistResponse getAllChecklists() {
        return ChecklistResponse.builder()
                .status(HttpStatus.OK.value())
                .checklistList(checklistRepository.findAll())
                .build();
    }

    public GenericResponse deleteChecklist(String name) {
        Optional<Checklist> optionalChecklist = checklistRepository.findByName(name);

        if(optionalChecklist.isPresent()){
            checklistRepository.delete(optionalChecklist.get());

            return GenericResponse.builder()
                    .message("Checklist deleted successfully.")
                    .status(HttpStatus.OK.value())
                    .build();
        }

        throw new ChecklistDoesNotExistException("Checklist does not exist.");
    }
}
