package com.dormly.backend.S3;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/aws")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<?> addFile(@RequestParam("file") MultipartFile file) throws IOException {
        if(file == null || file.isEmpty()){
            return ResponseEntity.badRequest().body("File is missing or empty.");
        }

        String originalFileName = file.getOriginalFilename();
        String key = "users/" + "images/" + originalFileName;

        s3Service.putObject(key, file.getBytes());
        return ResponseEntity.status(HttpStatus.CREATED).body("File uploaded to S3 successfully");
    }

    @GetMapping("/files")
    public ResponseEntity<?> getAllFiles(){
        return ResponseEntity.status(HttpStatus.OK).body(s3Service.getAllObjects());
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam String key){
        byte[] fileData = s3Service.downloadObject(key);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + key.substring(key.lastIndexOf("/") + 1))
                .header("Content-Type", "application/octet-stream")
                .body(fileData);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFile(@RequestParam String key){
        s3Service.deleteObject(key);
        return ResponseEntity.status(HttpStatus.OK).body("File deleted from S3 successfully");
    }
}
