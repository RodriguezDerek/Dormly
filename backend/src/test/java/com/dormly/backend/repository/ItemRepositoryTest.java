package com.dormly.backend.repository;

import com.dormly.backend.model.Item;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
public class ItemRepositoryTest {

    @Autowired
    private ItemRepository itemRepository;

    @Test
    void shouldFindItemByName(){
        //Given
        Item item = new Item(null, "Pencils", null);
        itemRepository.save(item);

        //When
        Optional<Item> result = itemRepository.findByName("Pencils");

        //Then
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("Pencils");
    }
}
