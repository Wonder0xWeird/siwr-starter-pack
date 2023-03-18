import axios from "axios"
import { GENE_COLOR_MAP } from "../../../utils/axieFeatures"

function strMul(str, num) {
  var s = ""
  for (let i = 0; i < num; i++) {
    s += str
  }
  return s
}

function hex2bin(axie) {
  let hex = axie.genes

  //console.log(axie.id, axie.name, axie.class)

  hex = hex.replace("0x", "").toLowerCase()

  var out = ""
  for (var c of hex) {
    switch (c) {
      case "0":
        out += "0000"
        break
      case "1":
        out += "0001"
        break
      case "2":
        out += "0010"
        break
      case "3":
        out += "0011"
        break
      case "4":
        out += "0100"
        break
      case "5":
        out += "0101"
        break
      case "6":
        out += "0110"
        break
      case "7":
        out += "0111"
        break
      case "8":
        out += "1000"
        break
      case "9":
        out += "1001"
        break
      case "a":
        out += "1010"
        break
      case "b":
        out += "1011"
        break
      case "c":
        out += "1100"
        break
      case "d":
        out += "1101"
        break
      case "e":
        out += "1110"
        break
      case "f":
        out += "1111"
        break
      default:
        console.log("ERROR")
        return ""
    }
  }
  out = strMul("0", 256 - out.length) + out
  return out
}

const axieSchema = `
query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $owner: String) {
  total: axies(auctionType: $auctionType, from: 0, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    total
  }
  part1: axies(auctionType: $auctionType, from: 0, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part2: axies(from: 100, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part3: axies(from: 200, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part4: axies(from: 300, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part5: axies(from: 400, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part6: axies(from: 500, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part7: axies(from: 600, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part8: axies(from: 700, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part9: axies(from: 800, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part10: axies(from: 900, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part11: axies(from: 1000, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part12: axies(from: 1100, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part13: axies(from: 1200, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part14: axies(from: 1300, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part15: axies(from: 1400, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part16: axies(from: 1500, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part17: axies(from: 1600, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part18: axies(from: 1700, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part19: axies(from: 1800, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part20: axies(from: 1900, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part21: axies(from: 2000, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part22: axies(from: 2100, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part23: axies(from: 2200, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part24: axies(from: 2300, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part25: axies(from: 2400, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part26: axies(from: 2500, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part27: axies(from: 2600, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part28: axies(from: 2700, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part29: axies(from: 2800, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part30: axies(from: 2900, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part31: axies(from: 3000, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part32: axies(from: 3100, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part33: axies(from: 3200, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part34: axies(from: 3300, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part35: axies(from: 3400, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part36: axies(from: 3500, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part37: axies(from: 3600, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part38: axies(from: 3700, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part39: axies(from: 3800, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part40: axies(from: 3900, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part41: axies(from: 4000, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part42: axies(from: 4100, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part43: axies(from: 4200, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part44: axies(from: 4300, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part45: axies(from: 4400, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part46: axies(from: 4500, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
  part47: axies(from: 4600, size: 100, sort: PriceAsc, criteria: $criteria, owner: $owner) {
    results {
      ...AxieBrief
    }
  }
}

fragment AxieBrief on Axie {
  id
  image
  class
  name
  genes
  owner
  bodyShape
  parts {
    type
    id
    name
    class
  }
}
`

async function fetchAllAxies(address) {
  const payload = JSON.stringify({
    operation: "GetAxieBriefList",
    query: axieSchema,
    variables: {
      owner: address,
    },
  })
  try {
    const res = await axios.post("/api/inventory/graphQL", {
      payload: payload,
    })
    console.log("res.data", res.data)
    return res.data
  } catch (err) {
    throw err
  }
}

function PartArrayMerger(Array) {
  let ObjectToMerge: any
  let ItemDataArray: any[] = []

  ObjectToMerge = Array[0].data

  //for each key in the ObjectToMerge object
  for (let part in ObjectToMerge) {
    if (part !== "total") {
      const set = ObjectToMerge[part].results

      for (let i = 0; i < set.length; i++) {
        const axieGene = hex2bin(set[i])

        const colorBin = axieGene.slice(34, 64).slice(18, 22)
        const classBin = axieGene.slice(0, 4)

        var constructAxie = {
          name: set[i].name,
          class: set[i].class,
          id: set[i].id,
          bodyShape: set[i].bodyShape,
          parts: set[i].parts,
          image: set[i].image.replace("assets", "axiecdn"),
          color: GENE_COLOR_MAP[classBin][colorBin],
        }

        ItemDataArray = [...ItemDataArray, constructAxie]
      }
    }
  }
  return ItemDataArray
}

/** Run the getAxieBriefList GraphQL operation in order to get a list of the user's axies given by address */
export async function getAxieBriefList(address): Promise<number | any[]> {
  var data = await fetchAllAxies(address)
  var allAxiesArray = await PartArrayMerger([data])
  return allAxiesArray
}

export async function getAxieDetail(axieId, url = ""): Promise<any> {
  const axieDetail = {
    operationName: "GetAxieDetail",
    variables: {
      axieId: axieId,
    },
    query: `query GetAxieDetail($axieId: ID!) {
            axie(axieId: $axieId) {
                ...AxieDetail
            }
        }
            
        fragment AxieDetail on Axie {
            id
            image
            class
            name
            genes
            owner
            bodyShape
            parts {
                type
                id
                name
                class
            }
        }`,
  }

  const axie = await axios
    .post(url + "/api/inventory/graphQL", {
      payload: JSON.stringify(axieDetail),
    })
    .then(async (response) => {
      if (response.data.data.axie !== null) {
        const constructAxie = {
          owner: response.data.data.axie.owner,
          name: response.data.data.axie.name,
          class: response.data.data.axie.class,
          id: response.data.data.axie.id,
          bodyShape: response.data.data.axie.bodyShape,
          parts: response.data.data.axie.parts,
          image: response.data.data.axie.image.replace("assets", "axiecdn"),
        }
        return Promise.resolve(constructAxie)
      } else {
        throw new Error("Axie not found")
      }
    })
    .catch((error) => {
      console.log(error)
    })

  return Promise.resolve(axie)
}
