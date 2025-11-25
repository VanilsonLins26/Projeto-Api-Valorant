package com.example.ProjetoIntegracao.grpc;


import auth.ActivatePremiumRequest;
import auth.ActivatePremiumResponse;
import auth.AuthServiceGrpc;
import auth.ValidateTokenRequest;
import auth.ValidateTokenResponse;


import com.example.ProjetoIntegracao.auth.JwtUtil;
import com.example.ProjetoIntegracao.service.UsuarioService;


import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@GrpcService
@RequiredArgsConstructor
@Slf4j
public class AuthGrpcController extends AuthServiceGrpc.AuthServiceImplBase {


    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;

    @Override
    public void validateToken(ValidateTokenRequest request, StreamObserver<ValidateTokenResponse> responseObserver) {
        try {
            log.info("=== AUTHSERVICE DEBUG ===");
            log.info("Recebendo validação de token");

            String token = request.getToken();
            boolean isValid = jwtUtil.validateToken(token);

            ValidateTokenResponse response = ValidateTokenResponse.newBuilder()
                    .setIsValid(isValid)
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            log.error("Erro ao validar token: {}", e.getMessage());

            ValidateTokenResponse response = ValidateTokenResponse.newBuilder()
                    .setIsValid(false)
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }


    @Override
    public void activatePremium(ActivatePremiumRequest request, StreamObserver<ActivatePremiumResponse> responseObserver) {
        log.info("Recebendo solicitação gRPC para ativar premium do ID: {}", request.getUserId());

        try {
            // A conversão de long (primitivo) para Long (objeto) acontece aqui
            Boolean resultado = usuarioService.SetPremium(Long.valueOf(request.getUserId()));

            ActivatePremiumResponse response = ActivatePremiumResponse.newBuilder()
                    .setSuccess(resultado)
                    .setMessage("Premium ativado com sucesso!")
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            log.error("Erro ao ativar premium: {}", e.getMessage());

            ActivatePremiumResponse response = ActivatePremiumResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Erro: " + e.getMessage())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}