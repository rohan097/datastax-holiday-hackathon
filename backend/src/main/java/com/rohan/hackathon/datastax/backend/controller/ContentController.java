package com.rohan.hackathon.datastax.backend.controller;

import com.rohan.hackathon.datastax.backend.exception.EntityNotFoundException;
import com.rohan.hackathon.datastax.backend.model.Comment;
import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.model.Post;
import com.rohan.hackathon.datastax.backend.service.ContentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/posts")
public class ContentController {

    final ContentService contentService;
    private final Logger logger = LoggerFactory.getLogger(ContentController.class);

    public ContentController(final ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllPosts() {
        logger.info("Received request to get all posts.");
        return ResponseEntity.ok(contentService.getAllPosts());
    }

    @GetMapping("/id/")
    public ResponseEntity<Object> getPostById(@RequestParam("userId") String userId, @RequestParam("postId") String postId) {
        logger.info("Received request to get post with USER ID = {} and POST ID = {}.", userId, postId);
        return ResponseEntity.ok(contentService.getPostById(userId, postId));
    }

    @GetMapping("/comments/get")
    public ResponseEntity<Object> getComments(@RequestParam("postId") String postId) {
        logger.info("Received request to get all comments for POST ID = {}", postId);
        return ResponseEntity.ok(contentService.getAllComments(postId));
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addPost(@RequestBody Post request, @AuthenticationPrincipal JwtUserDetails userDetails) {
        logger.info("Received request to add post: {} from user: {}.", request, userDetails);
        contentService.addPost(request, userDetails);
        return ResponseEntity.ok("okay");
    }

    @PostMapping("/comments/add")
    public ResponseEntity<Object> addComment(@RequestBody Comment comment, @AuthenticationPrincipal JwtUserDetails userDetails) {
        logger.info("Received request to save comment: {} from user: {}.", comment, userDetails);
        contentService.addComment(comment, userDetails);
        return ResponseEntity.ok("okay");
    }

    @DeleteMapping("/comments/delete")
    public ResponseEntity<Object> deleteComment(@RequestParam("postId") String postId, @RequestParam("commentId") String commentId) {
        logger.info("Received request to delete comment: {} in post: {}", commentId, postId);
        contentService.deleteComment(postId, commentId);
        return ResponseEntity.ok("");
    }


    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<String> handleEntityException(EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

}
