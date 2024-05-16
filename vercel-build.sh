#!/bin/bash

# Atualize os submódulos
git submodule update --init --recursive

# Inicie o deploy padrão da Vercel
vercel --prod
