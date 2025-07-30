package com.Dev.backend_SpringBoot.controller;

import com.Dev.backend_SpringBoot.dto.CreateAccountRequest;
import com.Dev.backend_SpringBoot.dto.TransferRequest;
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
    public ResponseEntity<Account> createAccount(@Valid @RequestBody CreateAccountRequest createAccountRequest) {
        Account account = new Account();
        account.setAccountHolderName(createAccountRequest.getAccountHolderName());
        Account createdAccount = accountService.createAccount(account);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
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
