package com.br.ticketru.APIPaymentsEFI.gerencianet.pix.service;

import java.awt.Desktop;
import java.util.HashMap;
import java.util.Map;
import javax.imageio.ImageIO;

import br.com.gerencianet.gnsdk.Gerencianet;
import br.com.gerencianet.gnsdk.exceptions.GerencianetException;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;

public class PixGenerateQRCode {
    public static void main(String[] args) throws FileNotFoundException {

        com.br.ticketru.APIPaymentsEFI.gerencianet.Credentials credentials = new com.br.ticketru.APIPaymentsEFI.gerencianet.Credentials();

        HashMap<String, Object> options = new HashMap<String, Object>();
        options.put("client_id", credentials.getClientId());
        options.put("client_secret", credentials.getClientSecret());
        options.put("certificate", credentials.getCertificate());
        options.put("sandbox", credentials.isSandbox());

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("id", "2");

        try {
            Gerencianet gn = new Gerencianet(options);
            Map<String, Object> response = gn.call("pixGenerateQRCode", params, new HashMap<String, Object>());

            File outputfile = new File("qrCodeImage.png");
            ImageIO.write(ImageIO.read(new ByteArrayInputStream(
                    javax.xml.bind.DatatypeConverter
                            .parseBase64Binary(((String) response.get("imagemQrcode")).split(",")[1]))),
                    "png", outputfile);
            Desktop desktop = Desktop.getDesktop();
            desktop.open(outputfile);

        } catch (GerencianetException e) {
            System.out.println(e.getError());
            System.out.println(e.getErrorDescription());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
