package com.rohan.hackathon.datastax.backend.service;

import com.rohan.hackathon.datastax.backend.model.Experience;
import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.repository.content.ContentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContentService {

    private static final Logger logger = LoggerFactory.getLogger(ContentService.class);

    private final ContentRepository contentRepository;

    public ContentService(final ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public void addExperience(final Experience experience, final JwtUserDetails userDetails) {
        experience.setUserId(userDetails.getId());
        if (contentRepository.save(experience)) {
            logger.info("Successfully saved experience.");
        }
    }
}
