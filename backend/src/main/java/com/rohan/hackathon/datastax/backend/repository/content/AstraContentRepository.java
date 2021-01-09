package com.rohan.hackathon.datastax.backend.repository.content;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.rohan.hackathon.datastax.backend.model.Experience;
import org.springframework.stereotype.Component;

@Component
public class AstraContentRepository implements ContentRepository {

    final ContentDao contentDao;

    public AstraContentRepository(final CqlSession cqlSession) {
        ContentMapper contentMapper = new ContentMapperBuilder(cqlSession).build();
        this.contentDao = contentMapper.contentDao(CqlIdentifier.fromCql("application"));
    }

    @Override
    public Boolean save(Experience experience) {
        return contentDao.save(experience);
    }
}
