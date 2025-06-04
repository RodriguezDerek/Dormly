package com.dormly.backend.controller;

import com.dormly.backend.DTO.ChecklistRequest;
import com.dormly.backend.service.ChecklistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/checklist")
@RequiredArgsConstructor
public class ChecklistController {

    private final ChecklistService checklistService;

    @PostMapping("/checklists")
    public ResponseEntity<?> createChecklist(@Valid @RequestBody ChecklistRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(checklistService.createChecklist(request.getName()));
    }

    @GetMapping("/checklists")
    public ResponseEntity<?> getAllChecklists(){
        return ResponseEntity.status(HttpStatus.OK).body(checklistService.getAllChecklists());
    }

    @DeleteMapping("/checklists/{id}")
    public ResponseEntity<?> deleteChecklist(Long id){
        return ResponseEntity.status(HttpStatus.OK).body(checklistService.deleteChecklist(id));
    }
}
