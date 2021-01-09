package com.rohan.hackathon.datastax.backend.controller;

import com.rohan.hackathon.datastax.backend.model.Experience;
import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.service.ContentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/experiences")
public class ContentController {

    final ContentService contentService;
    private final Logger logger = LoggerFactory.getLogger(ContentController.class);

    public ContentController(final ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addExperience(@RequestBody Experience request, @AuthenticationPrincipal JwtUserDetails userDetails) {
        logger.info("Received request to add experience: {} from user: {}.", request, userDetails);
        contentService.addExperience(request, userDetails);
        return ResponseEntity.ok().build();
    }

}
