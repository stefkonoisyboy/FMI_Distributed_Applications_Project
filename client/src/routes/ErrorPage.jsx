import { Stack, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack
      id="error-page"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "calc(100vh - 112px)" }}
    >
      <Typography variant="h3">Oops!</Typography>
      <Typography>Sorry, an unexpected error has occurred.</Typography>
      <Typography>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Stack>
  );
}
