const CONNECT_TO_SAIGON_TESTNET = false

const chainId = CONNECT_TO_SAIGON_TESTNET ? "2021" : "2020"
const roninJsonRpcUrl = CONNECT_TO_SAIGON_TESTNET
  ? "https://saigon-testnet.roninchain.com/rpc"
  : "https://api.roninchain.com/rpc"

const siwrConfig = {
  allowListed: true,
  connectToSaigon: CONNECT_TO_SAIGON_TESTNET,
  chainId: chainId,
  roninJsonRpcUrl: roninJsonRpcUrl,
  treasuryAddress: "ronin:...",
}

export default siwrConfig
