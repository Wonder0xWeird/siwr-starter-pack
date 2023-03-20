import React from "react"
import { Flex, GridItem, SimpleGrid, Image } from "@chakra-ui/react"
import Console from "../../../common/Console"
import AxieCard from "./AxieCard"

export default function AxieTeam(props) {
  return (
    <Flex overflowX="auto" p="15px 0" position="relative" minH="380px">
      <SimpleGrid
        columns={3}
        w="100%"
        columnGap={10}
        minW="1050px"
        minH="350px"
        position="absolute"
      >
        {[1, 2, 3].map((box, index) => (
          <GridItem
            display="flex"
            justifyContent={"center"}
            colSpan={1}
            key={`${index}_pedestal_placeholder`}
            minW="350px"
          >
            <Console
              w="350px"
              h="350px"
              boxShadow="inset 0 0 20px 10px #141921"
              overflow="hidden"
              p="0"
            >
              <Image
                w="350px"
                h="350px"
                src="/images/axies/Coco_Slurper.png"
                opacity={0.15}
              />
            </Console>
          </GridItem>
        ))}
      </SimpleGrid>
      <SimpleGrid columns={3} w="100%" columnGap={10} minW="1050px" bg="none">
        {!props.isRegistered
          ? props.registeringAxies.map((axie, index) => (
              <GridItem
                display="flex"
                justifyContent={"center"}
                colSpan={1}
                key={`${axie.id}_pedestal`}
                minW="350px"
              >
                <AxieCard
                  pedestal
                  axie={axie}
                  registeringAxies={props.registeringAxies}
                  setRegisteringAxies={props.setRegisteringAxies}
                  selected
                />
              </GridItem>
            ))
          : props.registeredAxies.map((axie, index) => (
              <GridItem
                display="flex"
                justifyContent={"center"}
                colSpan={1}
                key={`${axie.id}_pedestal`}
                minW="350px"
              >
                <AxieCard
                  registered
                  pedestal
                  axie={axie}
                  registeringAxies={props.registeringAxies}
                  setRegisteringAxies={props.setRegisteringAxies}
                  selected
                />
              </GridItem>
            ))}
      </SimpleGrid>
    </Flex>
  )
}
