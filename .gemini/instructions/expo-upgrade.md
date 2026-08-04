# expo-upgrade.md

# Expo Upgrade (Conversão da Skill para instruções do Gemini)

## Objetivo
Quando solicitado a atualizar um projeto Expo, consulte o guia oficial de migração e aplique/siga obrigatoriamente este fluxo.

## Regras
- Nunca use `npm install` para pacotes do ecossistema Expo.
- Prefira `npx expo install`.
- Preserve compatibilidade entre Expo SDK, React Native e bibliotecas Expo.
- Consulte o changelog oficial antes de alterar versões.
- Faça alterações mínimas necessárias.

## Fluxo

1. Identifique a versão atual:
```sh
npx expo --version
npx expo-doctor
```

2. Atualize o SDK:
```sh
npx expo install expo@latest
```

ou para uma versão específica:

```sh
npx expo install expo@<SDK>
```

3. Atualize dependências Expo:

```sh
npx expo install --fix
```

4. Atualize dependências não Expo apenas se compatíveis.

5. Revise:
- app.json
- app.config.js/ts
- plugins
- eas.json
- babel.config.js
- metro.config.js
- tsconfig.json

6. Caso existam diretórios nativos:
- sincronize ios/
- sincronize android/

7. Execute:

```sh
npx expo-doctor
npx expo start --clear
```

8. Corrija incompatibilidades antes de prosseguir.

## Checklist

- SDK atualizado
- Dependências compatíveis
- Expo Doctor sem erros
- Build inicia corretamente
- Plugins compatíveis
- Breaking changes revisadas

## Ao responder ao usuário

Sempre:
- explique as mudanças;
- liste comandos antes de executá-los;
- informe riscos de breaking changes;
- proponha correções para incompatibilidades;
- nunca remova dependências sem justificar.

## Critérios de aceite

- Projeto compila.
- Expo Doctor sem erros críticos.
- Dependências alinhadas ao SDK.
- Configurações preservadas.
