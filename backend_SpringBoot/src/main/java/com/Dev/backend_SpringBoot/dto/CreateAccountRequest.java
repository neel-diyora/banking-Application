package com.Dev.backend_SpringBoot.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class CreateAccountRequest {
    @NotBlank(message = "Account holder name is mandatory")
    private String accountHolderName;

    @NotNull(message = "Initial deposit is required")
    @DecimalMin(value = "1000.00", message = "Initial deposit must be at least 1000")
    private BigDecimal balance;

    // Getters and Setters
    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
