import Pedestal from "./Pedestal"

export default function Team(props) {
   let numRegistering
   let emptyPedestals

   const isRegistered = props.registeredAxies.length !== 0

   if (!isRegistered) {
      numRegistering = props.registeringAxies.length
      emptyPedestals = new Array(3 - numRegistering).fill(1, 0, 3 - numRegistering)
   }

   return (
      <>
         {
            !isRegistered
               ?
               props.registeringAxies.map((axie, key) =>
                  <Pedestal
                     key={`${axie.id}_pedestal`}
                     number={key}
                     registeredAxies={props.registeredAxies}
                     setRegisteringAxies={props.setRegisteringAxies}
                     axie={axie}
                  />
               )
               :
               props.registeredAxies.map((axie, key) =>
                  <Pedestal
                     key={`${axie.id}_pedestal`}
                     registeredAxies={props.registeredAxies}
                     number={key}
                     axie={axie}
                  />
               )
         }

         {!isRegistered &&

            emptyPedestals.map((_, key) =>
               <Pedestal
                  test="test"
                  key={"test" + key}
                  number={numRegistering + key}
               />
            )
         }
      </>
   )
}