package com.paymentservice.service;

import com.paymentservice.grpc.AuthServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcConfig {

    @Bean
    public AuthServiceGrpc.AuthServiceBlockingStub authStub(

            @GrpcClient("auth-service") AuthServiceGrpc.AuthServiceBlockingStub client
    ) {
        return client;
    }
}