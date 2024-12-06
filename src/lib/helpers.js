import { BrowserProvider, Contract } from "ethers";

export const contAddr = "0xB792F4AE5351917d18639d1E132e7F585e579E07";

export const abi = [
    "function count() public view returns(int256)",
    "function plus() public",
    "function minus() public",
];

export const loadContract = async (loadProvider) => {
    const provider = new BrowserProvider(loadProvider);
    const signer = await provider.getSigner();
    const contract = new Contract(contAddr, abi, signer);
    return contract;
}