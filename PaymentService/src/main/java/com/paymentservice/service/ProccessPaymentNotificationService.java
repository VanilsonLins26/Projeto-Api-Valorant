package com.paymentservice.service;



import com.paymentservice.client.MercadoPagoClient;
import com.paymentservice.dto.ProccessNotificationResponseDTO;
import com.paymentservice.grpc.ActivatePremiumRequest;
import com.paymentservice.grpc.ActivatePremiumResponse;
import com.paymentservice.grpc.AuthServiceGrpc;
import com.paymentservice.model.PaymentEntity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class ProccessPaymentNotificationService {

    private final MercadoPagoClient mercadoPagoClient;

    @Autowired
    private AuthServiceGrpc.AuthServiceBlockingStub authStub;

    public ProccessNotificationResponseDTO proccessPaymentNotification(String id, String type) {

        log.info("Iniciando notificação de pagamento com id: {} e tipo: {}", id, type);

        try {
            PaymentEntity payment = mercadoPagoClient.getPaymentoStatus(Long.valueOf(id));

            var reference = payment.getOrderId();
            String[] parts = reference.split("_");

            var userId = Long.valueOf(parts[0]);

            if ("approved".equalsIgnoreCase(payment.getStatus())) {
                log.info("Pagamento aprovado! Chamando AuthService para liberar User ID: {}", userId);
                ativarPremiumViaGrpc(userId);
            }

            return new ProccessNotificationResponseDTO(true, payment.getStatus());
        }
        catch(Exception e){
            log.info("Error processing notification for id {}: {}", id, e.getMessage());
            return new ProccessNotificationResponseDTO(false, "SERVER_ERROR");
        }

    }

    private void ativarPremiumViaGrpc(Long userId) {
        try {

            ActivatePremiumRequest request = ActivatePremiumRequest.newBuilder()
                    .setUserId(userId)
                    .build();

            ActivatePremiumResponse response = authStub.activatePremium(request);

            if (response.getSuccess()) {
                log.info("Sucesso gRPC: {}", response.getMessage());
            } else {
                log.error("Falha gRPC ao ativar premium: {}", response.getMessage());
            }

        } catch (Exception e) {
            log.error("Erro de comunicação gRPC com AuthService: {}", e.getMessage());

        }
    }

}
