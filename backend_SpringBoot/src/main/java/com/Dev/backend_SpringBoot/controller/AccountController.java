package com.Dev.backend_SpringBoot.controller;

import com.Dev.backend_SpringBoot.dto.CreateAccountRequest;
import com.Dev.backend_SpringBoot.dto.DepositRequest;
import com.Dev.backend_SpringBoot.dto.TransferRequest;
import com.Dev.backend_SpringBoot.dto.WithdrawRequest;
import com.Dev.backend_SpringBoot.entity.Account;
import com.Dev.backend_SpringBoot.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React dev server
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccount(@Valid @RequestBody CreateAccountRequest createAccountRequest) {
        try {
            Account account = new Account();
            account.setAccountHolderName(createAccountRequest.getAccountHolderName());
            // Set the initial balance from the request
            account.setBalance(createAccountRequest.getBalance());

            Account createdAccount = accountService.createAccount(account);
            return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating account: " + e.getMessage());
        }
    }

    @PostMapping("/accounts/{accountNumber}/deposit")
    public ResponseEntity<Account> deposit(
            @PathVariable String accountNumber,
            @Valid @RequestBody DepositRequest depositRequest) {
        try {
            Account updatedAccount = accountService.depositMoney(accountNumber, depositRequest.getAmount());
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            // In a real app, you'd have more specific exception handling
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/accounts/{accountNumber}/withdraw")
    public ResponseEntity<?> withdraw(
            @PathVariable String accountNumber,
            @Valid @RequestBody WithdrawRequest withdrawRequest) {
        try {
            Account updatedAccount = accountService.withdrawMoney(accountNumber, withdrawRequest.getAmount());
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            // Return a more descriptive error message to the client
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/accounts/{accountNumber}/balance")
    public ResponseEntity<BigDecimal> getBalance(@PathVariable String accountNumber) {
        return accountService.getBalance(accountNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/transfers")
    public ResponseEntity<Void> transferMoney(@Valid @RequestBody TransferRequest transferRequest) {
        try {
            accountService.transferMoney(
                    transferRequest.getFromAccountNumber(),
                    transferRequest.getToAccountNumber(),
                    transferRequest.getAmount()
            );
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
