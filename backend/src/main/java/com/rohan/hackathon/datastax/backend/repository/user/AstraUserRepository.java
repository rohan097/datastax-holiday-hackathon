package com.rohan.hackathon.datastax.backend.repository.user;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.rohan.hackathon.datastax.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class AstraUserRepository implements UserRepository {

    private final UserDao userDao;

    public AstraUserRepository(final CqlSession cqlSession) {
        UserMapper userMapper = new UserMapperBuilder(cqlSession).build();
        this.userDao = userMapper.userDao(CqlIdentifier.fromCql("application"));
    }

    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public Boolean save(User user) {
        return userDao.save(user);
    }


}
