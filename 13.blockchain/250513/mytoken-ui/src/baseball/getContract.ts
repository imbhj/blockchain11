import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BaseballNFTABI from "../contracts/BaseballNFT.json";

const getContract = () => {
  const baseballNftTokenAddress = "0x63800cf043f618c1DedA905293C313234034a6a7";
  const web3 = new Web3(window.ethereum);

  const baseballNftTokenContract = new web3.eth.Contract(
    BaseballNFTABI.abi as AbiItem[],
    baseballNftTokenAddress
  );

  return {
    baseballNftTokenAddress,
    baseballNftTokenContract,
  };
};

export default getContract;
