#!/bin/bash

# Script para preparar assets para produção
echo "🔄 Preparando assets para produção..."

# Criar diretórios na pasta public se não existirem
mkdir -p public/icons
mkdir -p public/images

# Copiar ícones SVG
echo "📁 Copiando ícones..."
cp src/assets/icons/*.svg public/icons/ 2>/dev/null || echo "⚠️  Alguns ícones podem já existir"

# Copiar imagens
echo "🖼️  Copiando imagens..."
cp src/assets/images/*.jpg public/images/ 2>/dev/null || echo "⚠️  Algumas imagens podem já existir"
cp src/assets/images/*.png public/images/ 2>/dev/null || echo "⚠️  Algumas imagens podem já existir"

# Copiar background pattern
echo "🎨 Copiando padrão de fundo..."
cp src/assets/bg-pattern.png public/ 2>/dev/null || echo "⚠️  Background pattern pode já existir"

echo "✅ Assets preparados para produção!"
echo ""
echo "📂 Estrutura da pasta public:"
find public -type f | sort
