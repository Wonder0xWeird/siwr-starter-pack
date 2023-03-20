export interface IStats {
  hp: number
  hpRegen: number
  armorFlat: number
  armorPerc: number
  moveSpeed: number
}

export function getAxieGameStats(axieClass: string, axieBody: string) {
  const baseStats: IStats = {
    hp: 100,
    hpRegen: 5,
    armorFlat: 1,
    armorPerc: 0,
    moveSpeed: 100,
  }

  return getStats(axieClass, axieBody, baseStats)
}

function getStats(axieClass: string, axieBody: string, stats: IStats) {
  switch (axieClass) {
    case "Bird":
      stats.hp -= 25
      stats.moveSpeed += 30
      break
    case "Bug":
      stats.hp += 10
      stats.moveSpeed += 20
      break
    case "Aquatic":
      stats.hp += 5
      stats.moveSpeed += 10
      break
    case "Dawn":
      stats.hp -= 15
      stats.moveSpeed += 20
      stats.hpRegen += 6
      break
    case "Mech":
      stats.hp -= 20
      stats.moveSpeed += 20
      stats.armorPerc += +6
      stats.armorFlat += 2
      break
    case "Dusk":
      stats.hp += 35
      stats.moveSpeed -= 20
      stats.armorPerc += 6
      stats.armorFlat += 2
      break
    case "Beast":
      stats.hp += 30
      stats.moveSpeed -= 10
      break
    case "Reptile":
      stats.hp += 50
      stats.moveSpeed -= 20
      break
    case "Plant":
      stats.hp += 60
      stats.moveSpeed -= 30
      break
  }

  switch (axieBody) {
    case "Sumo":
      stats.hp += 180
      stats.armorFlat += 5
      stats.hpRegen += 10
      break
    case "WetDog":
      stats.hp += 80
      stats.moveSpeed += 60
      stats.hpRegen += 20
      break
    case "Fuzzy":
      stats.hp += 20
      stats.moveSpeed += 20
      stats.armorPerc += 10
      stats.hpRegen += 20
      break
    case "Normal":
      stats.hp += 20
      stats.moveSpeed += 20
      stats.armorPerc = stats.armorPerc + 10
      stats.hpRegen = stats.hpRegen + 10
      break
    case "Curly":
      stats.hp += 20
      stats.armorPerc = stats.armorPerc + 0
      stats.armorFlat = stats.armorFlat + 0
      stats.hpRegen = stats.hpRegen + 40
      break
    case "Spiky":
      stats.hp += 20
      stats.armorPerc = stats.armorPerc + 30
      stats.armorFlat = stats.armorFlat + 0
      stats.hpRegen = stats.hpRegen + 10
      break
    case "BigYak":
      stats.hp += 260
      stats.armorPerc = stats.armorPerc + 0
      stats.armorFlat = stats.armorFlat + 0
      stats.hpRegen = stats.hpRegen + 10
      break
    case "Wavy":
      stats.hp += 20
      stats.armorPerc = stats.armorPerc + 20
      stats.armorFlat = stats.armorFlat + 0
      stats.hpRegen = stats.hpRegen + 20
      break
    case "Frosty":
      stats.hp += 100
      stats.armorPerc = stats.armorPerc + 0
      stats.armorFlat = stats.armorFlat + 5
      stats.hpRegen = stats.hpRegen + 20
      break
  }

  return stats
}
