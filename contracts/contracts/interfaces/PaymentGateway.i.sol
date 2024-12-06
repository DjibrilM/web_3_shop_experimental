// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPaymentGateway {
    /****
     * @dev This struct describes represents the structure of a seller's wallet.
     * @param validators The list of validators that can validate a withdraw.
     * @param masterValidator this is the address of the wallet's creator.
     * @param validationCount The total number of validation required to initiate a withdraw.
     * @param balance The wallet balance.
     */
    struct Wallet {
        address[] validators;
        address masterValidator;
        uint16 validationCount;
        uint256 balance;
        uint256 currentPendingTransaction;
    }

    struct ReturnedOrder {
        uint256 price;
        string productName;
        string productId;
        address client;
        address walleAddress;
    }

    enum WalletTransactionStats {
        COMPLETED,
        ONGOING
    }

    struct PendingTransaction {
        address recipient;
        address[] validators;
        uint256 amount;
        WalletTransactionStats status;
    }

    /**
     * @dev Get the seller's address
     */
    function getWallet(address wallet_address) external returns (Wallet memory);

    /**
     *@dev Get the seller's wallet balance
     */
    function getWalletBalance(
        address wallet_address
    ) external returns (uint256);

    /**
     *@dev This function is used to add a new validator to the seller's wallet
     @param validator The address of the new validator 
     */
    function addValidator(address validator) external returns (bool);

    /**
     *@dev Since the seller's wallet is a multi-signature wallet, this function is used to initiate
           a transaction from the seller's wallet that all validators will have to validate
     * @param amount The amount of money that validators are willing to withdraw.
     * @param recipient The withdraw recipient.
     */
    function initiateTransaction(
        uint256 amount,
        address recipient
    ) external returns (bool);

    /**
     * @dev This function is used to create a new seller's wallet.
     * @param validators The list of validators that can validate a pending transaction.
     * @param validationCount The total number of validation required to process a transaction.
     */
    function createWallet(
        address[] memory validators,
        uint16 validationCount
    ) external returns (bool);

    function validateTransaction(
        address walletAddress,
        uint256 transactionIndex
    ) external returns (bool);

    /**
     *
     * @param productName Name of the product that the user is buying.
     * @param productId The web2 product id.
     * @param price The price of the ordered product.s
     * @param walletAddress Seller's wallet address
     */
    function placeOrder(
        string memory productName,
        string memory productId,
        uint256 price,
        address walletAddress
    ) external payable returns (bool);
}
