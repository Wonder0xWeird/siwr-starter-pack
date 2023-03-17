import { forwardRef, Box, BoxProps, StackProps } from "@chakra-ui/react"

interface ConsoleProps extends BoxProps {
  header?: boolean
}

const Console = forwardRef<ConsoleProps, "div">((props, ref) => (
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
    color="gray.100"
    {...props}
  >
    {props.children}
  </Box>
))

export default Console
