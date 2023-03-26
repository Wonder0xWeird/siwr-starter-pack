import React from "react"

export default function useWindowWidth(size) {
  const [width, setWidth] = React.useState<number>(0)

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [width])
  // console.log(width);
  return width > size
}
