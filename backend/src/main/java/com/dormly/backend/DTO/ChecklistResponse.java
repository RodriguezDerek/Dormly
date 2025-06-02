package com.dormly.backend.DTO;

import com.dormly.backend.model.Checklist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChecklistResponse {
    private int status;
    private List<Checklist> checklistList;
}
