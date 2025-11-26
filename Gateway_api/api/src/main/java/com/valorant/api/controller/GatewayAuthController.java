package com.valorant.api.controller;


import com.example.auth.grpc.*;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth") // O Gateway agora vai aceitar /auth
public class GatewayAuthController {

    @GrpcClient("auth-service")
    private AuthServiceGrpc.AuthServiceBlockingStub authStub;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO request) {
        try {

            LoginRequest grpcRequest = LoginRequest.newBuilder()
                    .setEmail(request.email())
                    .setPassword(request.senha())
                    .build();

            // 2. Chama o AuthService
            LoginResponse response = authStub.login(grpcRequest);

            // 3. Verifica erro
            if (!response.getError().isEmpty()) {
                return ResponseEntity.status(401).body(Map.of("erro", response.getError()));
            }

            // 4. Devolve JSON para o Front
            return ResponseEntity.ok(Map.of(
                    "token", response.getToken(),
                    "premium", response.getPremium(),
                    "id", response.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro no Gateway: " + e.getMessage());
        }
    }

    // Adicione o @PostMapping("/registrar") aqui também se precisar
}

// DTO simples
record LoginDTO(String email, String senha) {}