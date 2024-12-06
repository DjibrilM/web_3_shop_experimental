// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./interfaces/PaymentGateway.i.sol";

//========== ERRORS===========
//=============================
error PayementGateway_DuplicatedValidators();
error PayementGateway_InvalidMasterValidators();
error PayementGateway_InvalidPriceSent();
error PayementGateway_WalletAlreadyCreated();
error PayementGateway_MasterValidatorShouldNotBeValidator();
error PayementGateway_InvalidValidators();
error PayementGateway_ShouldNotExceedMaximumValidatorsLength();
error PayementGateway_ValidatorsLengthShouldNoBeLessThanRequiredMinimum();
error PayementGateway_ValidationCountShouldNotExceedValidatorsLength();
error PayementGateway_ValidationCountShouldNotBeOneOrZero();

contract PaymentGateway is IPaymentGateway {
    uint256 private immutable MINIMUM_WALLET_VALIDATORS;
    uint256 private immutable MAXIMUM_WALLET_VALIDATORS;

    mapping(address => Wallet) s_wallet;
    mapping(address => mapping(uint256 => PendingTransaction))
        private s_pendingTransactions;

    event AddValidator(address indexed validator);

    event Order(
        uint256 price,
        uint256 transactionValueProof,
        string productName,
        string productId,
        address indexed indexedClientAddress,
        address indexed indexedSellerAddress,
        address  clientAddress,
        address  sellerAddress
    );

    event CompletedTransaction(
        address indexed walletAddress,
        uint256 amount,
        uint256 transactionIndex,
        address indexed recipientAddress
    );

    event CreateWallet(address walletAddress, address[] validators);

    modifier IsNotMasterValidator(address sender) {
        if (sender != s_wallet[sender].masterValidator) {
            revert PayementGateway_InvalidMasterValidators();
        }
        _;
    }

    modifier IsWalletAlreadyCreated(address wallet_address) {
        if (s_wallet[wallet_address].validationCount > 0) {}
        _;
    }

    modifier IsValidator(address validator, address walletAddress) {
        address[] memory validators = s_wallet[walletAddress].validators;
        bool isValidator;

        for (uint index = 0; index < validators.length; index++) {
            if (validators[index] == validator) {
                isValidator = true;
            }
        }

        require(isValidator == true, "Milicious validator");
        _;
    }

    constructor(
        uint256 minimum_wallet_validators,
        uint256 maximum_wallet_validators
    ) {
        MINIMUM_WALLET_VALIDATORS = minimum_wallet_validators;
        MAXIMUM_WALLET_VALIDATORS = maximum_wallet_validators;
    }

    function getWallet(
        address wallet_address
    ) external view returns (Wallet memory) {
        return s_wallet[wallet_address];
    }

    function getWalletBalance(
        address wallet_address
    ) external view returns (uint256) {
        return s_wallet[wallet_address].balance;
    }

    function addValidator(
        address validator
    ) external IsNotMasterValidator(msg.sender) returns (bool) {
        s_wallet[msg.sender].validators.push(validator);
        emit AddValidator(validator);
        return true;
    }

    function createWallet(
        address[] memory validators,
        uint16 validationCount
    ) external IsWalletAlreadyCreated(msg.sender) returns (bool) {
        require(
            s_wallet[msg.sender].validators.length < 1,
            "Wallet already created"
        );

        if (validators.length + 1 > MAXIMUM_WALLET_VALIDATORS) {
            revert PayementGateway_ShouldNotExceedMaximumValidatorsLength();
        } else if (validators.length + 1 < MINIMUM_WALLET_VALIDATORS) {
            revert PayementGateway_ValidatorsLengthShouldNoBeLessThanRequiredMinimum();
        } else if (validationCount > validators.length + 1) {
            revert PayementGateway_ValidationCountShouldNotExceedValidatorsLength();
        } else if (validationCount <= 1) {
            revert PayementGateway_ValidationCountShouldNotBeOneOrZero();
        }

        s_wallet[msg.sender] = Wallet({
            balance: 0,
            masterValidator: msg.sender,
            validationCount: validationCount,
            validators: new address[](0),
            currentPendingTransaction: 0
        });

        for (uint i = 0; i < validators.length; i++) {
            //Wallte msg.sender should not be among validators
            if (validators[i] == msg.sender) {
                revert PayementGateway_MasterValidatorShouldNotBeValidator();
            }

            //Check for duplicated validators
            for (uint index = 0; index < validators.length; index++) {
                if (validators[index] == validators[i] && i != index) {
                    revert PayementGateway_DuplicatedValidators();
                }
            }
            s_wallet[msg.sender].validators.push(validators[i]);
        }

        emit CreateWallet(msg.sender, validators);
        return true;
    }

    function initiateTransaction(
        uint256 amount,
        address recipient
    ) external returns (bool) {
        Wallet memory wallet = s_wallet[msg.sender];

        require(amount > 0, "Transaction amout can't be 0");
        require(wallet.balance >= amount, "Invalid balance");
        require(wallet.validators[0] != address(0), "Wallet not created");

        uint256 newTransactionIndex = ++s_wallet[msg.sender]
            .currentPendingTransaction;

        s_pendingTransactions[msg.sender][
            newTransactionIndex
        ] = PendingTransaction({
            validators: new address[](0),
            amount: amount,
            recipient: recipient,
            status: WalletTransactionStats.ONGOING
        });
        return true;
    }

    function validateTransaction(
        address walletAddress,
        uint256 transactionIndex
    ) external IsValidator(msg.sender, walletAddress) returns (bool) {
        PendingTransaction memory transaction = s_pendingTransactions[
            walletAddress
        ][transactionIndex];

        for (uint index = 0; index < transaction.validators.length; index++) {
            require(
                transaction.validators[index] != msg.sender,
                "Already participated"
            );
        }

        s_pendingTransactions[walletAddress][transactionIndex].validators.push(
            msg.sender
        );

        if (
            s_pendingTransactions[walletAddress][transactionIndex]
                .validators
                .length +
                1 >=
            s_wallet[walletAddress].validationCount
        ) {
            (bool success, ) = transaction.recipient.call{
                value: transaction.amount
            }("");

            require(success, "Failed to process the transaction");
        }

        return true;
    }

    function placeOrder(
        string memory productName,
        string memory productId,
        uint256 price,
        address walletAddress
    ) external payable returns(bool ) {
        require(msg.value >= price, "Invalid amount");
        s_wallet[walletAddress].balance += msg.value;
        uint256 value = msg.value;

        emit Order(
            price,
            value,
            productName,
            productId,
            walletAddress,
            msg.sender,
            msg.sender,
            walletAddress
        );
        
        return true;
    }
}
