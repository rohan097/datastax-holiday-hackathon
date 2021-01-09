package com.rohan.hackathon.datastax.backend.repository.content;

import com.rohan.hackathon.datastax.backend.model.Experience;

public interface ContentRepository {

    Boolean save(Experience experience);
}
