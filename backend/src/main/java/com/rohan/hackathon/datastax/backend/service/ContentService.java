package com.rohan.hackathon.datastax.backend.service;

import com.google.common.collect.ImmutableMap;
import com.rohan.hackathon.datastax.backend.exception.EntityNotFoundException;
import com.rohan.hackathon.datastax.backend.model.Comment;
import com.rohan.hackathon.datastax.backend.model.CommentsResponse;
import com.rohan.hackathon.datastax.backend.model.JwtUserDetails;
import com.rohan.hackathon.datastax.backend.model.Post;
import com.rohan.hackathon.datastax.backend.repository.comment.CommentRepository;
import com.rohan.hackathon.datastax.backend.repository.content.ContentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ContentService {

    private static final Logger logger = LoggerFactory.getLogger(ContentService.class);

    private final ContentRepository contentRepository;
    private final CommentRepository commentRepository;

    public ContentService(final ContentRepository contentRepository, final CommentRepository commentRepository) {
        this.contentRepository = contentRepository;
        this.commentRepository = commentRepository;
    }

    public void addPost(final Post post, final JwtUserDetails userDetails) {
        post.setUserId(userDetails.getId());
        if (contentRepository.save(post)) {
            logger.info("Successfully saved post..");
        }
    }

    public List<Post> getAllPosts() {
        List<Post> items = contentRepository.getAll();
        logger.info("Got {} items from DB.", items.size());
        return items;
    }

    public Post getPostById(String userIdString, String postIdString) {
        UUID userId = UUID.fromString(userIdString);
        UUID postId = UUID.fromString(postIdString);
        Optional<Post> item = contentRepository.findById(userId, postId);
        if (item.isPresent()) {
            return item.get();
        } else {
            throw new EntityNotFoundException("No item found.");
        }
    }

    public void addComment(final Comment comment, final JwtUserDetails jwtUserDetails) {
        comment.setUserId(jwtUserDetails.getId());
        comment.setUsername(jwtUserDetails.getProfileName());
        if (commentRepository.save(comment)) {
            logger.info("Successfully saved comment.");
        }
    }

    public Map<String, Object> getAllComments(final String postIdString) {
        UUID postId = UUID.fromString(postIdString);
        List<Comment> comments = commentRepository.getCommentsByPostId(postId);
        return createCommentResponse(comments);
    }

    public Boolean deleteComment(final String postIdString, final String commentIdString) {
        UUID postId = UUID.fromString(postIdString);
        UUID commentId = UUID.fromString(commentIdString);
        return commentRepository.delete(postId, commentId);
    }

    private Map<String, Object> createCommentResponse(List<Comment> comments) {
        List<CommentsResponse> copy = comments.stream().map(CommentsResponse::new).collect(Collectors.toList());
        List<CommentsResponse> roots = new ArrayList<>();
        Map<UUID, CommentsResponse> map = new HashMap<>();
        copy.forEach(commentsResponse -> map.put(commentsResponse.getCommentId(), commentsResponse));
        for (Map.Entry<UUID, CommentsResponse> entry : map.entrySet()) {
            CommentsResponse item = entry.getValue();
            if (item.getParentId() == null) {
                roots.add(item);
            } else if (map.containsKey(item.getParentId())) {
                CommentsResponse parent = map.get(item.getParentId());
                parent.addChild(item);
            }
        }
        return ImmutableMap.of("comments", roots);
    }

    public List<Post> previewAllPosts() {
        List<Post> items = contentRepository.getAll();
        logger.info("Got {} items from DB.", items.size());
        items
                .forEach(post -> {
                    if (post.getContent().length() > 250) {
                        post.setContent(post.getContent().substring(0, 250));
                    }
                });

        return items;
    }
}
