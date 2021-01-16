package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.PagingIterable;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.rohan.hackathon.datastax.backend.model.Post;
import com.rohan.hackathon.datastax.backend.model.PostsByYear;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class AstraContentRepository implements ContentRepository {

    final ContentDao contentDao;

    public AstraContentRepository(final CqlSession cqlSession) {
        ContentMapper contentMapper = new ContentMapperBuilder(cqlSession).build();
        this.contentDao = contentMapper.contentDao(CqlIdentifier.fromCql("application"));
    }

    @Override
    public List<Integer> getDistinctYears() {
        ResultSet resultSet = contentDao.getDistinctYears();
        return resultSet.all().stream().map(row -> row.getInt("YEAR")).collect(Collectors.toList());
    }

    @Override
    public List<PostsByYear> getAllPostsByYear(Integer year) {
        PagingIterable<PostsByYear> result = contentDao.getAllPostsByYear(year);
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

    @Override
    public Boolean save(PostsByYear postsByYear) {
        return contentDao.save(postsByYear);
    }

    @Override
    public Boolean delete(Post post) {
        return null;
    }
}
