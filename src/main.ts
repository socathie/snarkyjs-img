import { Photoshop } from './Photoshop.js';

import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'snarkyjs';

import { pack1DArrayTo2D } from './util.js';
import { test } from 'small-mnist';

const img = pack1DArrayTo2D(test[0].input, 20, 20);
// make number[][] into Field[][]
const imgField = img.map((row) => row.map((pixel) => Field(pixel)));

await isReady;

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
  zkAppInstance.initState(imgField);
});
await deployTxn.prove();
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// get the initial state of IncrementSecret after deployment
const num0 = zkAppInstance.hash.get();
console.log('state after init:', num0.toString());

// ----------------------------------------------------

// const txn1 = await Mina.transaction(senderAccount, () => {
//   zkAppInstance.incrementSecret(salt, Field(750));
// });
// await txn1.prove();
// await txn1.sign([senderKey]).send();

// const num1 = zkAppInstance.x.get();
// console.log('state after txn1:', num1.toString());

// ----------------------------------------------------

console.log('Shutting down');

await shutdown();