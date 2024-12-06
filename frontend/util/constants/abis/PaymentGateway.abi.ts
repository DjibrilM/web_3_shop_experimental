const PaymentGateway = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minimum_wallet_validators",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maximum_wallet_validators",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "PayementGateway_DuplicatedValidators",
    type: "error",
  },
  {
    inputs: [],
    name: "PayementGateway_InvalidMasterValidators",
    type: "error",
  },
  {
    inputs: [],
    name: "PayementGateway_MasterValidatorShouldNotBeValidator",
    type: "error",
  },
  {
    inputs: [],
    name: "PayementGateway_ShouldNotExceedMaximumValidatorsLength",
    type: "error",
  },
  {
    inputs: [],
    name: "PayementGateway_ValidationCountShouldNotBeOneOrZero",
    type: "error",
  },
  {
    inputs: [],
    name: "PayementGateway_ValidationCountShouldNotExceedValidatorsLength",
    type: "error",
  },
  {
    inputs: [],
    name: "PayementGateway_ValidatorsLengthShouldNoBeLessThanRequiredMinimum",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "validator",
        type: "address",
      },
    ],
    name: "AddValidator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "transactionIndex",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipientAddress",
        type: "address",
      },
    ],
    name: "CompletedTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "validators",
        type: "address[]",
      },
    ],
    name: "CreateWallet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        indexed: true,
        internalType: "string",
        name: "productId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sellerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "clientAddress",
        type: "address",
      },
    ],
    name: "Order",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validator",
        type: "address",
      },
    ],
    name: "addValidator",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "validators",
        type: "address[]",
      },
      {
        internalType: "uint16",
        name: "validationCount",
        type: "uint16",
      },
    ],
    name: "createWallet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet_address",
        type: "address",
      },
    ],
    name: "getWallet",
    outputs: [
      {
        components: [
          {
            internalType: "address[]",
            name: "validators",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "masterValidator",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "validationCount",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentPendingTransaction",
            type: "uint256",
          },
        ],
        internalType: "struct IPaymentGateway.Wallet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet_address",
        type: "address",
      },
    ],
    name: "getWalletBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "initiateTransaction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "productName",
        type: "string",
      },
      {
        internalType: "string",
        name: "productId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "placeOrder",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "productName",
            type: "string",
          },
          {
            internalType: "string",
            name: "productId",
            type: "string",
          },
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "address",
            name: "walleAddress",
            type: "address",
          },
        ],
        internalType: "struct IPaymentGateway.ReturnedOrder",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "transactionIndex",
        type: "uint256",
      },
    ],
    name: "validateTransaction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;


export default PaymentGateway;


