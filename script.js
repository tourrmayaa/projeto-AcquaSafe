const express = require('express');
const app = express();

app.use(express.json());

function analisarAgua(ph, turbidez) {
    let status = "Água Potável";

    if (ph < 6.0 || ph > 9.0) {
        status = "Risco Químico";
    }

    if (turbidez > 2000) {
        status = "Possível Contaminação Biológica";
    }

    if (ph < 5.5 && turbidez > 2500) {
        status = "ALTO RISCO — Água Imprópria";
    }

    return status;
}

app.post('/dados', (req, res) => {
    const { ph, turbidez } = req.body;

    const diagnostico = analisarAgua(ph, turbidez);

    console.log("PH:", ph);
    console.log("Turbidez:", turbidez);
    console.log("Status:", diagnostico);

    res.json({ status: diagnostico });
});

app.listen(3000, () => {
    console.log("Servidor rodando...");
});

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Doencas from "./pages/Doencas";
import Solucoes from "./pages/Solucoes";
import Periculosidade from "./pages/Periculosidade";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Monitor de Água" component={Home} />
        <Stack.Screen name="Doenças" component={Doencas} />
        <Stack.Screen name="Soluções" component={Solucoes} />
        <Stack.Screen name="Periculosidade" component={Periculosidade} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}