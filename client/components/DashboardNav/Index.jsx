import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Menu } from "./Routes";

export default function Index() {
  const MenuStack = createDrawerNavigator();
  return (       
      <MenuStack.Navigator>
        <MenuStack.Screen name="Menu" component={Menu} />
      </MenuStack.Navigator>
  );
}
// export function Menu() {
//   const MenuStack = createDrawerNavigator();
//   return (
//     <MenuStack.Navigator>
//       <MenuStack.Screen name="Dashboard" component={DashboardRoutes} />
//       <MenuStack.Screen name="Recarga" component={Deposit} />
//       <MenuStack.Screen name="Transferencia" component={SendMoney} />
//       <MenuStack.Screen name="Contactos" component={Contacts} />
//     </MenuStack.Navigator>
//   );
// }
