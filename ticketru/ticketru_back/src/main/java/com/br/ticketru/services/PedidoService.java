package com.br.ticketru.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.br.ticketru.dto.Exceptions.HandlerException;
import com.br.ticketru.dto.Mappers.EStatus;
import com.br.ticketru.entities.Pedido;
import com.br.ticketru.entities.User;

import com.br.ticketru.repositories.PedidoRepository;
import com.br.ticketru.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class PedidoService {

    @Autowired
    PedidoRepository pedidoRepository;

    @Autowired
    UserRepository userRepository;

    public User findByUserRa(String ra) {
        return userRepository.findByRa(ra);
    }

    /*
     * public String deletePedido(String ra) {
     * List<Pedido> pedido = pedidoRepository.findByUser(findByUserRa(ra));
     * if (pedido == null) {
     * return "pedido not found";
     * }
     * pedidoRepository.delete(pedido);
     * return "pedido deleted successfully";
     * }
     */

    public List<Pedido> findAll() {

        return pedidoRepository.findAll();
    }

    public List<Pedido> findByRa(String ra) {
        return pedidoRepository.findByUser(findByUserRa(ra));
    }

    public Pedido findById(int id) {
        return pedidoRepository.findById(id);
    }

    public List<Pedido> findAllPedidosByRa(String ra) {
        List<Pedido> pedidos = pedidoRepository.findAll();
        List<Pedido> pedidosByRa = new ArrayList<>();

        for (Pedido pedido : pedidos) {
            if (pedido.getRa().equals(ra)) {
                pedidosByRa.add(pedido);
            }
        }

        return pedidosByRa;
    }

    public Pedido createPedido(Pedido pedido) {
        try {
            User user = userRepository.findByRa(pedido.getRa());
            pedido.setStatus(EStatus.PENDENTE);
            pedido.setPreco(pedido.getQuantidade() * 3.5);
            // pedido.setQuantidade(quantidade);
            pedido.setUser(user);
            // pedido.setRa(ra);
            pedidoRepository.save(pedido);

            return pedido;
        } catch (Exception e) {
            throw new HandlerException("Erro ao criar pedido");
        }
    }

    public Pedido payPedido(int id) {
        try {
            Pedido pedido = pedidoRepository.findById(id);

            // CHECK IF RA EXISTS
            if (pedido == null) {
                throw new HandlerException("Pedido não encontrado");
            }
            pedido.setStatus(EStatus.PAGO);
            pedidoRepository.save(pedido);

            // increment user saldo
            User user = userRepository.findByRa(pedido.getRa());
            user.setSaldo(user.getSaldo() + pedido.getQuantidade());
            userRepository.save(user);

            return pedido;
        } catch (Exception e) {
            throw new HandlerException("Erro ao pagar pedido");
        }
    }

    public Pedido cancelPedido(int id) {
        try {
            Pedido pedido = pedidoRepository.findById(id);

            // CHECK IF RA EXISTS
            if (pedido == null) {
                throw new HandlerException("Pedido não encontrado");
            }
            pedido.setStatus(EStatus.CANCELADO);
            pedidoRepository.save(pedido);

            return pedido;
        } catch (Exception e) {
            throw new HandlerException("Erro ao cancelar pedido");
        }
    }

    public static void main(String args[]) {

        PedidoService pedidoService = new PedidoService();

        // System.out.println(pedidoService.findAllPedidosByRa("23"));
        // findall
        System.out.println(pedidoService.findAll());
    }
}
