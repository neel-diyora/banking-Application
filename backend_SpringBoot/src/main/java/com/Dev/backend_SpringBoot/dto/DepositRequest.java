package com.Dev.backend_SpringBoot.dto;

import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class DepositRequest {
    @Positive(message = "Deposit amount must be positive")
    private BigDecimal amount;

    // Getter and Setter
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
