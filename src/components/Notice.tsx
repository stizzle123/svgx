import { Paper, useMediaQuery } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Text } from "./Text";
import { useAppSelector } from "../state/hooks";

const css = (isLightMode: boolean, matches: boolean, visible: boolean) => ({
  position: "absolute",
  right: 20,
  zIndex: 1,
  padding: 1.5,
  borderRadius: 0,
  backgroundColor: isLightMode ? "#feecdd" : "#000",
  color: isLightMode ? "#000" : "#fff",
  visibility: visible ? "visible" : "hidden",
  maxWidth: matches ? 300 : 400,
  bottom: matches ? 20 : 80,
  animation: visible ? "fade-in 0.8s" : "fade-out 0.8s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@keyframes fade-out": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
  "@keyframes fade-in": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

interface INotice {
  title: string;
  visible: boolean;
}

export const Notice = ({ title, visible }: INotice) => {
  const matches = useMediaQuery("(max-width:600px)");
  const { isLightMode } = useAppSelector((state) => state.app);

  return (
    <Paper
      sx={{
        ...css(isLightMode!, matches, visible),
      }}
      elevation={!isLightMode ? 0 : 1}
    >
      <AutoAwesomeIcon
        sx={{
          fontSize: matches ? 20 : 30,
          marginRight: 1,
        }}
        fontSize="small"
      />
      <Text
        sx={{
          fontSize: matches ? 9 : 12,
        }}
      >
        {title}
      </Text>
    </Paper>
  );
};

export default Notice;
