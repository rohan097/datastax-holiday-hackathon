package com.rohan.hackathon.datastax.backend.service;

import com.google.common.collect.ImmutableMap;
import com.rohan.hackathon.datastax.backend.exception.EntityNotFoundException;
import com.rohan.hackathon.datastax.backend.model.*;
import com.rohan.hackathon.datastax.backend.repository.comment.CommentRepository;
import com.rohan.hackathon.datastax.backend.repository.content.ContentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
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


    public List<Integer> getDistinctYears() {
        List<Integer> result = contentRepository.getDistinctYears();
        result.sort(Collections.reverseOrder());
        return result;
    }

    public Boolean addPost(final Post post, final JwtUserDetails userDetails) {
        post.setUserId(userDetails.getId());
        if (contentRepository.save(post)) {
            logger.info("Successfully saved post to POSTS_BY_USER table.");
            logger.info("Now saving post to POSTS_BY_YEAR table.");
            if (contentRepository.save(createPostsByYearObject(post))) {
                logger.info("Successfully saved post to POSTS_BY_YEAR table.");
            } else {
                // Rollback changes to POSTS_BY_USER table.
                logger.error("Could not save post to POSTS_BY_YEAR table.");
                logger.info("Rolling back insert to POSTS_BY_USER table.");
                contentRepository.delete(post);
                return false;
            }
            return true;
        }
        return false;
    }

    private PostsByYear createPostsByYearObject(Post post) {
        PostsByYear postsByYear = new PostsByYear();
        postsByYear.setContent(post.getContent());
        postsByYear.setPostId(post.getPostId());
        postsByYear.setUserId(post.getUserId());
        postsByYear.setCreatedAt(post.getCreatedAt());
        postsByYear.setTitle(post.getTitle());
        return postsByYear;
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
        comment.setUsername(jwtUserDetails.getUsername());
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
        List<CommentsResponse> copy = comments.stream().map(CommentsResponse::new).map(this::getDate).collect(Collectors.toList());
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

    private CommentsResponse getDate(CommentsResponse commentsResponse) {
        Instant createdAt = commentsResponse.getCreatedAt();
        Instant currentInstant = Instant.now();
        Duration timeDifference = Duration.between(createdAt, currentInstant);
        if (timeDifference.toMinutes() < 60) {
            commentsResponse.setDate("now");
        } else if (timeDifference.toHours() < 24) {
            commentsResponse.setDate(timeDifference.toHours() + "h");
        } else {
            commentsResponse.setDate(timeDifference.toDays() + "d");
        }
        return commentsResponse;
    }

    public List<PostsByYear> previewAllPosts(String year) {
        List<PostsByYear> items = contentRepository.getAllPostsByYear(Integer.valueOf(year));
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
