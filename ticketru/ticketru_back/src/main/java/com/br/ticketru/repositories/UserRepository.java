package com.br.ticketru.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

import com.br.ticketru.entities.User;

//import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {
        // find by id
        // User findById(Long id);

        User findByRa(String ra);

        User findByRaIgnoreCase(String ra);

        User findByEmailIgnoreCase(String email);

        // int getSaldo(int saldo);

        Boolean existsByEmailIgnoreCase(String email);

        Boolean existsByRaIgnoreCase(String ra);

}