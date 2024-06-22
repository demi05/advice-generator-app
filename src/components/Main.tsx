import { Box, Flex, Image, Spinner, Text, keyframes, useBreakpointValue } from "@chakra-ui/react";
import diceIcon from "../assets/images/icon-dice.svg";
import patternDividerDesktop from "../assets/images/pattern-divider-desktop.svg";
import patternDividerMobile from "../assets/images/pattern-divider-mobile.svg";
import axios from "axios";
import { useState } from "react";

const Main = () => {
  const patternDividerSrc = useBreakpointValue({
    base: patternDividerMobile,
    sm: patternDividerMobile,
    md: patternDividerDesktop,
    lg: patternDividerDesktop,
    xl: patternDividerDesktop
  })

  type SlipType = {
    advice: string;
    id: number;
  };
  type AdviceType = {
    slip?: SlipType;
  };

  const [advicee, setAdvicee] = useState<AdviceType>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchAdvice = () => {
    setIsLoading(true);
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        setAdvicee(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError("Error fetching advice. Please try again");
        setIsLoading(false);
      });
  };

  const glow = keyframes`
  0% { filter: brightness(1); }
  50% { filter: brightness(1.5); }
  `

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      backgroundColor={"hsl(218, 23%, 16%)"}
      p={["2em", "3em", "0", "0"]}
    >
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1.5em"}
        padding={"2em"}
        paddingBottom={"3em"}
        borderRadius={"0.8rem"}
        backgroundColor={"hsl(217, 19%, 24%)"}
        pos={"relative"}
      >
        {advicee.slip && (
          <Text color={"hsl(150, 100%, 66%)"}>ADVICE #{advicee.slip.id}</Text>
        )}

        {isLoading ? (
          <Spinner color="#fff" fontSize={"2rem"} />
        ) : advicee ? (
          advicee.slip && (
            <Text
              color={"hsl(193, 38%, 86%)"}
              fontSize={"2rem"}
              textAlign={"center"} maxW={["400px", "500px", "600px", "600px"]}
            >
              "{advicee.slip.advice}"
            </Text>
          )
        ) : (
          <div>{error}</div>
        )}

        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Image src= {patternDividerSrc} w={"100%"} fontWeight={900} />
          </Box>
        </Flex>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => fetchAdvice()}
          backgroundColor={"hsl(150, 100%, 66%)"}
          padding={"0.5em"}
          borderRadius={"50%"}
          width={["15%", "12.5%", "10%", "10%"]}
          cursor={"pointer"}
          pos={"absolute"}
          bottom={"-25px"}
          height={"50px"}
          transition="all 0.3s ease-in-out"
          _hover={{animation: `${glow} 1s`}}
        >
          <Image src={diceIcon} fontSize={"2rem"} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Main;
