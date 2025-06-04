package com.dormly.backend.controller;

import com.dormly.backend.DTO.ItemRequest;
import com.dormly.backend.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/items")
    public ResponseEntity<?> createItem(@Valid @RequestBody ItemRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(itemService.createItem(request.getName(), request.getChecklistId()));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long itemId, @RequestParam String name){
        return ResponseEntity.status(HttpStatus.OK).body(itemService.updateItem(itemId, name));
    }

    @DeleteMapping("items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long itemId){
        return ResponseEntity.status(HttpStatus.OK).body(itemService.deleteItem(itemId));
    }
}
