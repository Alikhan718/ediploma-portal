import React from "react";

import { Text } from "@aws-amplify/ui-react";

export function AuthHeader(): JSX.Element {
  // const { tokens } = useTheme();
  return (
    <React.Fragment>
      <Text
        textAlign="center"
        color="#FCAF58"
        fontWeight="600"
        fontSize="62px"
      // padding={tokens.space.medium}
      >
        Kwaaka
      </Text>
      <Text
        textAlign="center"
        color="#fff"
        marginBottom="50px"
        fontSize="18px"
        lineHeight="25px"
      >
        Управлять заказами просто!
      </Text>
    </React.Fragment>
  );
}
