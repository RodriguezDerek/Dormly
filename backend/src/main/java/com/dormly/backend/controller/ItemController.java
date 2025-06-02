package com.dormly.backend.controller;

import com.dormly.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

}
