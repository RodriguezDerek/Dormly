package com.dormly.backend.service;

import com.dormly.backend.DTO.GenericResponse;
import com.dormly.backend.exception.checklists.ChecklistDoesNotExistException;
import com.dormly.backend.exception.items.ItemAlreadyExistsException;
import com.dormly.backend.exception.items.ItemDoesNotExistException;
import com.dormly.backend.model.Checklist;
import com.dormly.backend.model.Item;
import com.dormly.backend.repository.ChecklistRepository;
import com.dormly.backend.repository.ItemRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private ChecklistRepository checklistRepository;

    @InjectMocks
    private ItemService itemService;

    @Test // createItem — Success Case
    void shouldCreateItemWhenNameDoesNotExistAndChecklistExists(){
        //Given
        String name = "Shoes";
        Long checklistID = 1L;
        Checklist checklist = new Checklist();
        checklist.setId(checklistID);
        when(itemRepository.findByName(name)).thenReturn(Optional.empty());
        when(checklistRepository.findById(checklistID)).thenReturn(Optional.of(checklist));

        //When
        GenericResponse response = itemService.createItem(name, checklistID);

        //Then
        assertThat(response.getMessage()).isEqualTo("Item successfully created.");
        assertThat(response.getStatus()).isEqualTo(HttpStatus.CREATED.value());
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test // createItem: Failure Case 1 — Item name already exists
    void shouldThrowExceptionWhenItemNameAlreadyExists(){
        //Given
        String name = "Toothbrush";
        when(itemRepository.findByName(name)).thenReturn(Optional.of(new Item()));

        //When / Then
        assertThatThrownBy(() -> itemService.createItem(name, 1L))
                .isInstanceOf(ItemAlreadyExistsException.class)
                .hasMessage("Item already exists");
    }

    @Test // createItem: Failure Case 2 — Checklist ID does not exist
    void shouldThrowExceptionWhenChecklistIdDoesNotExist(){
        //Given
        String name = "Toothbrush";
        Long checklistID = 1L;
        when(itemRepository.findByName(name)).thenReturn(Optional.empty());
        when(checklistRepository.findById(checklistID)).thenReturn(Optional.empty());

        //When / Then
        assertThatThrownBy(() -> itemService.createItem(name, checklistID))
                .isInstanceOf(ChecklistDoesNotExistException.class)
                .hasMessage("Checklist with ID doesn't exist.");
    }

    @Test // updateItem — Success Case
    void shouldUpdateItemWhenItemExists(){
        //Given
        Long itemID = 1L;
        String newName = "School Supplies";
        Item item = new Item(itemID, "Old Name", null);
        when(itemRepository.findById(itemID)).thenReturn(Optional.of(item));

        //When
        GenericResponse response = itemService.updateItem(itemID, newName);

        //Then
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.getMessage()).isEqualTo("Item successfully updated.");
        verify(itemRepository).save(item);
        assertThat(item.getName()).isEqualTo(newName);
    }

    @Test // updateItem: Failure Case — Item ID does not exist
    void shouldThrowExceptionWhenUpdatingNonexistentItem(){
        //Given
        Long itemID = 99L;
        when(itemRepository.findById(itemID)).thenReturn(Optional.empty());

        //When / Then
        assertThatThrownBy(() -> itemService.updateItem(itemID, "Test"))
                .isInstanceOf(ItemDoesNotExistException.class)
                .hasMessage("Item doesn't exist");
    }

    @Test // deleteItem - Success Case
    void shouldDeleteItemWhenItemExists(){
        //Given
        Item item = new Item(1L, "Dorm Supplies", null);
        when(itemRepository.findById(1L)).thenReturn(Optional.of(item));

        //When
        GenericResponse response = itemService.deleteItem(1L);

        //Then
        assertThat(response.getMessage()).isEqualTo("Item successfully deleted.");
        assertThat(response.getStatus()).isEqualTo(HttpStatus.OK.value());
        verify(itemRepository).delete(item);
    }

    @Test // deleteItem: Failure Case — Item ID does not exist
    void shouldThrowExceptionWhenDeletingNonexistentItem(){
        //Given
        Long itemID = 99L;
        when(itemRepository.findById(itemID)).thenReturn(Optional.empty());

        //When / Then
        assertThatThrownBy(() -> itemService.deleteItem(itemID))
                .isInstanceOf(ItemDoesNotExistException.class)
                .hasMessage("Item doesn't exist.");
    }
}
