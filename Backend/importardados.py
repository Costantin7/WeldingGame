import os
import pandas as pd
import django

# Configuração do ambiente Django
# Substitua 'meu_projeto.settings' pelo caminho correto das suas configurações
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'meu_projeto.settings')
django.setup()

from welding.models import Perguntas

# Lista de arquivos a serem importados
arquivos = [
    ('modulo1_pt.xlsx', 'Modulo 1', 'pt'),
    ('modulo1_en.xlsx', 'Modulo 1', 'en'),
    ('modulo2_pt.xlsx', 'Modulo 2', 'pt'),
    ('modulo2_en.xlsx', 'Modulo 2', 'en'),
    ('modulo3_pt.xlsx', 'Modulo 3', 'pt'),
    ('modulo3_en.xlsx', 'Modulo 3', 'en'),
    ('modulo4_pt.xlsx', 'Modulo 4', 'pt'),
    ('modulo4_en.xlsx', 'Modulo 4', 'en'),
]

# Definição das colunas esperadas no arquivo Excel
# 'Explanation' foi adicionada como uma coluna opcional
colunas_obrigatorias = [
    'Nº', 'PERGUNTA',
    'RESPOSTA 0', 'RESPOSTA 1', 'RESPOSTA 2', 'RESPOSTA 3',
    'GABARITO: 0,1,2,3', 'Tema: 0,1,2,3'
]

for arquivo, modulo, idioma_padrao in arquivos:
    print(f"\n➡️ Importando {arquivo}...")

    try:
        xls = pd.ExcelFile(arquivo)
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {arquivo}. Pulando...")
        continue

    for i, sheet_name in enumerate(xls.sheet_names):
        nivel = i + 1  # Nível definido pela ordem da aba
        print(f"  - Processando aba: {sheet_name} (nível {nivel})")

        df = pd.read_excel(xls, sheet_name=sheet_name)
        
        # Limpa espaços em branco nos nomes das colunas
        df.columns = [str(col).strip() for col in df.columns]

        # Verifica se todas as colunas obrigatórias existem
        colunas_faltando = [col for col in colunas_obrigatorias if col not in df.columns]
        if colunas_faltando:
            print(f"❌ Colunas obrigatórias faltando na aba {sheet_name}: {colunas_faltando}. Pulando aba.")
            continue

        for idx, row in df.iterrows():
            try:
                # Pula linhas com campos obrigatórios ausentes
                if pd.isnull(row['Nº']) or pd.isnull(row['GABARITO: 0,1,2,3']) or pd.isnull(row['Tema: 0,1,2,3']):
                    print(f"⚠️ Linha {idx+2} ignorada por dados obrigatórios ausentes na aba {sheet_name}")
                    continue

                # Prepara os dados para criação do objeto
                dados_para_criar = {
                    'modulo': modulo,
                    'nivel': nivel,
                    'numero': int(row['Nº']),
                    'pergunta': row.get('PERGUNTA'),
                    'resposta_0': row.get('RESPOSTA 0'),
                    'resposta_1': row.get('RESPOSTA 1'),
                    'resposta_2': row.get('RESPOSTA 2'),
                    'resposta_3': row.get('RESPOSTA 3'),
                    'gabarito': int(row['GABARITO: 0,1,2,3']),
                    'tema': int(row['Tema: 0,1,2,3']),
                    'idioma': idioma_padrao,
                }

                # Adiciona a ilustração se a coluna existir e não for nula
                if 'Ilustração' in df.columns and pd.notna(row['Ilustração']):
                    dados_para_criar['ilustracao'] = row['Ilustração']

                # Adiciona a explicação se a coluna existir e não for nula
                # Assumindo que o nome do campo no seu modelo Django é 'explicacao'
                if 'Explanation' in df.columns and pd.notna(row['Explanation']):
                    dados_para_criar['explicacao'] = row['Explanation']

                Perguntas.objects.create(**dados_para_criar)

            except Exception as e:
                print(f"❌ Erro ao processar linha {idx+2} da aba {sheet_name}: {e}")

    print(f"✅ Importado com sucesso: {arquivo}")
