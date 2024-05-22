package com.br.ticketru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TicketruApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketruApplication.class, args);
		try {
			java.sql.Driver driver = java.sql.DriverManager.getDriver("jdbc:mysql://localhost:3306/");
			System.out.println(driver.getMajorVersion() + "." + driver.getMinorVersion());
		} catch (java.sql.SQLException e) {
			e.printStackTrace();
		}

		// console the host and port
		System.out.println("http://localhost:8080");

	}

}
