package com.rohan.hackathon.datastax.backend.repository.user;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.rohan.hackathon.datastax.backend.model.User;
import com.rohan.hackathon.datastax.backend.model.UsersByProfile;
import org.springframework.stereotype.Component;

@Component
public class AstraUserRepository implements UserRepository {

    private final UserDao userDao;

    public AstraUserRepository(final CqlSession cqlSession) {
        UserMapper userMapper = new UserMapperBuilder(cqlSession).build();
        this.userDao = userMapper.userDao(CqlIdentifier.fromCql("application"));
    }

    @Override
    public UsersByProfile findByProfile(String profileName) {
        return userDao.findByProfile(profileName);
    }

    @Override
    public Boolean save(User user) {
        return userDao.save(user);
    }

    @Override
    public Boolean save(UsersByProfile usersByProfile) {
        return userDao.save(usersByProfile);
    }

    @Override
    public Boolean delete(User user) {
        return userDao.delete(user);
    }


}
