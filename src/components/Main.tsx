import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import diceIcon from "../assets/images/icon-dice.svg";
import axios from "axios";
import { useState } from "react";
const Main = () => {
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

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      backgroundColor={"hsl(218, 23%, 16%)"}
    >
      <Box backgroundColor={"hsl(217, 19%, 38%"} color={"#fff"}>
        {advicee.slip && <Text color={"hsl(150, 100%, 66%)"}>ADVICE #{advicee.slip.id}</Text>}

          {isLoading ? (
            <Spinner color="#fff" />
          ) : advicee ? (
            advicee.slip && <Text color={"hsl(193, 38%, 86%)"}>"{advicee.slip.advice}"</Text>
          ) : (
            <div>{error}</div>
          )}

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          onClick={() => fetchAdvice()}
          backgroundColor={"hsl(150, 100%, 66%)"}
          padding={"0.5em"}
          borderRadius={"50%"}
          width={"30%"}
        >
          <Image src={diceIcon} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Main;
