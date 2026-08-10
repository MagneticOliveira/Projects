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
        System.out.println("OK");

        return user;
    }
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastro(
            @RequestParam String email,
            @RequestParam String password) {

        try {
            String sql = """
                    SELECT id, email FROM users WHERE email = ? AND password = ?
                    """;

            return ResponseEntity.ok(jdbcTemplate.queryForMap(sql, email, password));
        }catch(Exception e){
            return ResponseEntity.ok(noUser());
        }
    }

    @GetMapping("/teste")
    public ResponseEntity<?> Batata(
    ){
        String sql = """
                SELECT email FROM users WHERE email = ?
                """;

        String sql2 = """
                SELECT email FROM users WHERE id = 2
                """;
        return ResponseEntity.ok(jdbcTemplate.queryForObject(sql2, String.class));//, email));
    }
}
