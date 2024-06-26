package com.br.ticketru.APIPaymentsEFI.gerencianet;

import java.io.FileNotFoundException;
import java.util.HashMap;

import org.json.JSONObject;

import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

public class PixCreateEvp {
    public static void main(String[] args) throws FileNotFoundException {
        Credentials credentials = new Credentials();

        JSONObject options = new JSONObject();
        options.put("client_id", credentials.getClientId());
        options.put("client_secret", credentials.getClientSecret());
        options.put("pix_cert", credentials.getCertificate());
        options.put("sandbox", credentials.isSandbox());

        try {
            Gerencianet gn = new Gerencianet(options);
            JSONObject response = gn.call("pixCreateEvp", new HashMap<String, String>(), new JSONObject());
            System.out.println(response);
        } catch (GerencianetException e) {
            System.out.println(e.getError());
            System.out.println(e.getErrorDescription());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

}
