#!/bin/bash

# Etapa 0: Gerar Versão, Changelog e Tag (Localmente)
echo "🚀 Iniciando processo de Versionamento e Changelog..."
npx standard-version

if [ $? -eq 0 ]; then
  NEW_VERSION=$(node -p "require('./package.json').version")
  echo "✅ Versão local atualizada para: $NEW_VERSION"
else
  echo "❌ ERRO: Falha ao gerar versão e changelog."
  exit 1
fi

# Etapa 1: Construir a versão de produção do frontend
echo "- Iniciando criacao dos bundles do frontend 👌"
ionic build --prod
if [ $? -eq 0 ]; then
  echo "✅ BUNDLES DO FRONTEND CRIADOS COM SUCESSO 👌"
else
  echo "❌ ERRO: Falha na construção dos bundles do frontend."
  exit 1
fi

# Etapa 2: Gerar versão de produção da API
echo "- Iniciando criacao dos bundles do backend 👌"
npm run --prefix ../ari-fitness-api build
if [ $? -eq 0 ]; then
  echo "✅ BUILD DE PRODUÇÃO DA API FEITO COM SUCESSO!"
else
  echo "❌ ERRO: FALHA NO BUILD DE PRODUÇÃO DA API."
  exit 1
fi

# Etapa 3: Implantar (Deploy) na Vercel/Produção
echo "- Iniciando DEPLOY para produção 🚀🚀🚀"
npm run --prefix ../ari-fitness-api deploy

if [ $? -eq 0 ]; then
  echo "✅ DEPLOY EM PRODUÇÃO CONCLUÍDO COM SUCESSO!"

  # --- NOVA ETAPA: PUSH AUTOMÁTICO ---
  echo "📤 Sincronizando versão $NEW_VERSION com o repositório remoto..."

  # Envia o commit de release e a TAG gerada
  # Nota: 'master' é o nome da sua branch conforme os logs anteriores
  git push --follow-tags origin master

  if [ $? -eq 0 ]; then
    echo "✅ REPOSITÓRIO ATUALIZADO (Commit + Tag)!"
  else
    echo "⚠️ ALERTA: O deploy funcionou, mas houve um erro ao fazer o push para o GitHub."
    echo "Verifique sua conexão ou permissões e tente: git push --follow-tags"
  fi
  # -----------------------------------

else
  echo "❌ ERRO CRÍTICO: Falha na implantação. O código remoto NÃO foi atualizado."
  exit 1
fi

echo "🎉 PROCESSO FINALIZADO: Versão $NEW_VERSION disponível em produção e no GitHub!"
