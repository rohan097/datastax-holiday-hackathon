package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.PagingIterable;
import com.rohan.hackathon.datastax.backend.model.Post;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class AstraContentRepository implements ContentRepository {

    final ContentDao contentDao;

    public AstraContentRepository(final CqlSession cqlSession) {
        ContentMapper contentMapper = new ContentMapperBuilder(cqlSession).build();
        this.contentDao = contentMapper.contentDao(CqlIdentifier.fromCql("application"));
    }

    @Override
    public List<Post> getAll() {
        PagingIterable<Post> result = contentDao.getAll();
        return result.all();
    }

    @Override
    public Optional<Post> findById(UUID userId, UUID postId) {
        return contentDao.findById(userId, postId);
    }

    @Override
    public Boolean save(Post post) {
        return contentDao.save(post);
    }
}
