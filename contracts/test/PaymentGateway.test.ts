import { assert, expect } from "chai";
import { describe, beforeEach } from "mocha";
import { PaymentGateway } from "../typechain-types";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { Address } from "hardhat-deploy/types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { IPaymentGateway } from "../typechain-types/PaymentGateway";

describe("PaymentGateway", async () => {
  let paymentGateway: PaymentGateway;
  let signers: HardhatEthersSigner[];
  let deployer: Address;

  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture("all");
    signers = await ethers.getSigners();
    paymentGateway = await ethers.getContractAt(
      "PaymentGateway",
      (
        await deployments.get("PaymentGateway")
      ).address
    );
  });

  describe("createWallet", async () => {
    it("Should not re-create an already created wallet", async () => {
      const validators = signers.map((signer) => signer.address).slice(2,5);
      await paymentGateway.connect(signers[1]).createWallet(validators, 2);
      expect(
        paymentGateway.connect(signers[1]).createWallet(validators, 3)
      ).to.revertedWith("Wallet already created");
    });

    it("wallet admin should not be among validators", async () => {
      const validators = signers.map((signer) => signer.address);

      expect(
        paymentGateway.createWallet(
          validators,
          Math.floor(validators.length / 2)
        )
      ).be.revertedWithCustomError(
        paymentGateway,
        "PayementGateway_MasterValidatorShouldNotBeValidator"
      );
    });

    it("validator's length should not exceed MAXIMUM_WALLET_VALIDATORS or less than  MINIMUM_WALLET_VALIDATORS", async () => {
      expect(
        paymentGateway.createWallet(
          signers.map((signer) => signer.address).slice(0, 1),
          Math.floor(
            signers.map((signer) => signer.address).slice(0, 1).length / 2
          )
        )
      ).be.revertedWithCustomError(
        paymentGateway,
        "PayementGateway_ShouldNotExceedMaximumValidatorsLength"
      );
    });

    it("validations count should not exceed validators length", async () => {
      expect(
        paymentGateway.createWallet(
          signers.map((signer) => signer.address).slice(1, 5),
          3
        )
      ).be.revertedWithCustomError(
        paymentGateway,
        "PayementGateway_ValidationCountShouldNotExceedValidatorsLength"
      );
    });

    it("validations count should not be zero or one", async () => {
      expect(
        paymentGateway.createWallet(
          signers.map((signer) => signer.address).slice(1, 5),
          1
        )
      ).be.revertedWithCustomError(
        paymentGateway,
        "PayementGateway_ValidationCountShouldNotBeOneOrZero"
      );
    });

    it("Should create wallet", async () => {
      const validators = signers.slice(1, 5).map((signer) => signer.address);

      await paymentGateway.createWallet(
        validators,
        Math.floor(validators.length / 2)
      );

      const wallet = await paymentGateway.getWallet(deployer);

      assert.equal(wallet.validators.length, Math.floor(validators.length));
      assert.equal(deployer, wallet.masterValidator);
    });
  });

  describe("initiateTransaction", async () => {
    let wallet: IPaymentGateway.WalletStructOutput;
    beforeEach(async () => {
      const validators = signers.slice(1, 5).map((signer) => signer.address);

      await paymentGateway.createWallet(
        validators,
        Math.floor(validators.length / 2)
      );

      wallet = await paymentGateway.getWallet(deployer);
    });

    it("Transaction amount should not be zero", async () => {
      expect(
        paymentGateway.initiateTransaction(
          ethers.parseEther("0"),
          signers[5].address
        )
      ).to.revertedWith("Transaction amout can't be 0");
    });

    it("Should not initiate a transaction greater than the wallet's balance.", async () => {
      expect(
        paymentGateway.initiateTransaction(
          ethers.parseEther("2"),
          signers[5].address
        )
      ).to.revertedWith("Invalid balance");
    });

    it("Initiate transaction only if the wallet is already created.", async () => {
      expect(
        paymentGateway
          .connect(signers[3])
          .initiateTransaction(ethers.parseEther("2"), signers[5].address)
      ).to.revertedWith("Wallet not created");
    });

    it("Should successfully initiate the transaction", async () => {
      //In order for seller's to initiate a transaction the wallet must have some money in it , reason why i am making this purchase to so that the seller can have something.
      const placeOrderTx = await paymentGateway
        .connect(signers[3])
        .placeOrder(
          "play statation 5",
          Math.random().toString(),
          ethers.parseEther("0.5"),
          deployer,
          {
            value: ethers.parseEther("0.5"),
          }
        );

      await placeOrderTx.wait(1);
      const newBalance = await paymentGateway.getWalletBalance(deployer);

      assert.equal(Number(newBalance), Number(ethers.parseEther("0.5")));
    });
  });
});
