

# Etapa 0:  Nova versão
echo "Atualizando versão: $CURRENT_VERSION"

# Obter a versão atual do package.json usando sed
CURRENT_VERSION=$(sed -n 's/.*"version": "\(.*\)",*/\1/p' package.json)
# Dividir a versão
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
# Incrementar a versão
if [ "$PATCH" -lt 9 ]; then
  PATCH=$((PATCH + 1))
else
  PATCH=0
  if [ "$MINOR" -lt 9 ]; then
    MINOR=$((MINOR + 1))
  else
    MINOR=0
    MAJOR=$((MAJOR + 1))
  fi
fi

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

# Atualizar a versão no package.json usando sed
sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json

echo "Versão do package.json atualizada para $NEW_VERSION"



# Etapa 1: Construir a versão de produção do frontend
echo "- Iniciando criacao dos bundles do frontend 👌"
ionic build --prod
if [ $? -eq 0 ]; then
  echo "✅ BUNDLES DO FRONTEND CREATED COM SUCESSO 👌"
else
  echo "❌ ERRO: Falha na construção dos bundles."
  echo $?
  exit 1 # Sai do script com código de erro
fi

# Etapa 2: Gerar versão de produção da API
echo "- Iniciando criacao dos bundles do backend 👌"
npm run --prefix ../ari-fitness-api build
if [ $? -eq 0 ]; then
  echo "✅ BUILD DE PRODUÇÃO FEITO COM SUCESSO!" + $?
else
  echo "❌ ERRO: FALHA NO BUILD DE PRODUÇÃO DA API."
  echo $?
  exit 1 # Sai do script com código de erro
fi

echo "- Iniciando DEPLOY 🚀🚀🚀"
# Etapa 3: Implantar a API
npm run --prefix ../ari-fitness-api deploy

if [ $? -eq 0 ]; then
  echo "✅ API IMPLANTADA COM SUCESSO!" + $?
else
  echo "❌ ERRO: Falha na implantação da API."
  exit 1 # Sai do script com código de erro
fi

echo " PROCESSO DE BUILD E DEPLOY CONCLUÍDO! 🎉🎉🎉"