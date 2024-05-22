package com.br.ticketru.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.ticketru.entities.Pedido;
import com.br.ticketru.entities.User;

//import jakarta.transaction.Transactional;
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
        // find by id
        Pedido findById(int id);

        Pedido findByRa(String ra);

        List<Pedido> findByUser(User user);

}