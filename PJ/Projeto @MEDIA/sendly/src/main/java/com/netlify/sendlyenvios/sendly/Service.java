package com.netlify.sendlyenvios.sendly;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class Service {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static Object noUser(){
        Map<String, String> user = new HashMap<>();
        user.put("mensagem", "usuário ou senha incorretos");
        System.out.println("oi");

        return user;
    }
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastro(
            @RequestParam String email,
            @RequestParam String password) {

        System.out.println("Email: " + email);
        System.out.println("Senha: " + password);

        try {
            String sql = """
                    SELECT id, email FROM users WHERE email = ? AND password = ?
                    """;

//        Another Form to return
//        Map<String, String> data = new HashMap<>();
//
//        data.put("email", email);
//        data.put("senha", password);
//
//        return ResponseEntity.ok(data);

            return ResponseEntity.ok(jdbcTemplate.queryForMap(sql, email, password));
        }catch(Exception e){
            e.printStackTrace();   // IMPORTANTE

            throw e;               // IMPORTANTE
        }
    }

    @GetMapping("/teste")
    public String teste() {
        return "Funcionando";
    }
}
