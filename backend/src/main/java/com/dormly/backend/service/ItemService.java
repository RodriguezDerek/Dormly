package com.dormly.backend.service;

import com.dormly.backend.DTO.GenericResponse;
import com.dormly.backend.DTO.ItemResponse;
import com.dormly.backend.exception.checklists.ChecklistDoesNotExistException;
import com.dormly.backend.exception.items.ItemAlreadyExistsException;
import com.dormly.backend.exception.items.ItemDoesNotExistException;
import com.dormly.backend.model.Checklist;
import com.dormly.backend.model.Item;
import com.dormly.backend.repository.ChecklistRepository;
import com.dormly.backend.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ChecklistRepository checklistRepository;
    private final ItemRepository itemRepository;

    public GenericResponse createItem(String name, Long checklistId) {
        Optional<Item> optionalItem = itemRepository.findByName(name);
        if(optionalItem.isPresent()){
            throw new ItemAlreadyExistsException("Item already exists");
        }

        Optional<Checklist> optionalChecklist = checklistRepository.findById(checklistId);
        if(optionalChecklist.isPresent()){
            Item item = new Item();
            item.setName(name);
            item.setChecklist(optionalChecklist.get());
            itemRepository.save(item);

            return GenericResponse.builder()
                    .message("Item successfully created.")
                    .status(HttpStatus.CREATED.value())
                    .build();
        }

        throw new ChecklistDoesNotExistException("Checklist with ID doesn't exist.");
    }

    public GenericResponse updateItem(Long itemId, String name) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        if(optionalItem.isPresent()){
            Item item = optionalItem.get();
            item.setName(name);
            itemRepository.save(item);

            return GenericResponse.builder()
                    .message("Item successfully updated.")
                    .status(HttpStatus.OK.value())
                    .build();
        }

        throw new ItemDoesNotExistException("Item doesn't exist");
    }

    public GenericResponse deleteItem(Long itemId) {
        Optional<Item> optionalItem = itemRepository.findById(itemId);
        if(optionalItem.isPresent()){

            itemRepository.delete(optionalItem.get());
            return GenericResponse.builder()
                    .message("Item successfully deleted.")
                    .status(HttpStatus.OK.value())
                    .build();
        }

        throw new ItemDoesNotExistException("Item doesn't exist.");
    }
}
