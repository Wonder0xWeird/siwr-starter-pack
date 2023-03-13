import { forwardRef, Box, BoxProps } from "@chakra-ui/react"

interface IConsole extends BoxProps {
  header?: boolean
}

const Console = forwardRef<IConsole, "div">((props, ref) => (
  <Box
    border="1.5px solid #029eff"
    borderRadius={"10px"}
    boxShadow="-1px 3px 15px #141921"
    bg={
      props.header
        ? "linear-gradient(75deg, #34aeff 60%, #1c90ff 100%)"
        : "gray.700"
    }
    p="10px 15px"
    ref={ref}
    {...props}
  >
    {props.children}
  </Box>
))

export default Console
