import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

export default function PasswordInput({ ...props }) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input type={show ? "text" : "password"} {...props} />
      <InputRightElement width="4.5rem" mr="5px">
        <Button variant="primary" h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
