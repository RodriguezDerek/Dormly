package com.dormly.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequest {
    @NotBlank(message = "Item name is required.")
    private String name;

    @NotNull(message = "Checklist ID is required.")
    private Long checklistId;
}
