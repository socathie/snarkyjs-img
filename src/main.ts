import { Photoshop } from './Photoshop.js';

import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'snarkyjs';

import { FieldArray } from './util.js';

import { test } from 'small-mnist';

await isReady;

const img = test[0].input;
const imgArray = FieldArray.from(img.map(pixel => Field(pixel)));

console.log('SnarkyJS loaded');

const useProof = false;

const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);
const { privateKey: deployerKey, publicKey: deployerAccount } =
  Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } =
  Local.testAccounts[1];

// ----------------------------------------------------

// create a destination we will deploy the smart contract to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

const zkAppInstance = new Photoshop(zkAppAddress);
const deployTxn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
  zkAppInstance.initState(imgArray);
});
await deployTxn.prove();
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// get the initial state of IncrementSecret after deployment
const num0 = zkAppInstance.hash.get();
console.log('hash after init:', num0.toString());

// ----------------------------------------------------

const txn1 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.transform1(imgArray);
});
await txn1.prove();
await txn1.sign([senderKey]).send();

const num1 = zkAppInstance.hash1.get();
console.log('hash1 after txn1:', num1.toString());

// ----------------------------------------------------

const txn2 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.transform2(imgArray);
});
await txn2.prove();
await txn2.sign([senderKey]).send();

const num2 = zkAppInstance.hash2.get();
console.log('hash2 after txn2:', num2.toString());

// ----------------------------------------------------

console.log('Shutting down');

await shutdown();