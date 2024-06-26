package com.br.ticketru.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.br.ticketru.config.JwtService;
import com.br.ticketru.dto.AuthenticationUserDTO;
import com.br.ticketru.entities.User;
import com.br.ticketru.repositories.UserRepository;
import com.br.ticketru.utils.HashManagerUtils;

//import com.br.photos.photosCP.Model.Role;

@Service
public class UtilityService {

    @Autowired
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtHandler;

    public User findByRa(String id) {
        return userRepository.findByRaIgnoreCase(id);
    }

    public ResponseEntity<String> execute(com.br.ticketru.dto.AuthenticationUserDTO user) {
        System.out.println("ra: " + user.getRa());

        User result = findByRa(user.getRa());

        System.out.println("result: " + result);

        List<User> idFound = getUsers(result);

        User userFound = idFound.get(0);

        if (userFound == null || !userFound.getRa().equals(user.getRa())
                || !Boolean.TRUE.equals(HashManagerUtils.validateHash(user.getPassword(), userFound.getPassword()))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect ra or password");
        }

        String token = jwtHandler.generateToken(userFound.getRa(), userFound.getRole());

        return ResponseEntity.ok(token);
    }

    public List<User> getUsers(User users) {
        List<User> list = new ArrayList<>();
        list.add(users);
        return list;
    }

    /*
     * {
     * "id": 552,
     * "roles": [
     * {
     * "id": 402,
     * "name": "ADMINISTRATOR"
     * }
     * ]
     * }
     */
}
