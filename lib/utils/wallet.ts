import { addRequestMeta } from "next/dist/server/request-meta"

export function sliceRoninAddress(
  address: string,
  numCharacters: number = 4,
  style: string = "ronin:"
): string {
  let slicedAddress
  if (style === "ronin:") {
    slicedAddress =
      "ronin:" +
      address.slice(2, 2 + numCharacters) +
      "..." +
      address.slice(address.length - numCharacters, address.length)
  } else {
    slicedAddress =
      address.slice(0, 2 + numCharacters) +
      "..." +
      address.slice(address.length - numCharacters, address.length)
  }

  return slicedAddress
}
