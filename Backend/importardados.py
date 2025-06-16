import os
import pandas as pd
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'meu_projeto.settings')
django.setup()

from welding.models import Perguntas

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

colunas_esperadas = [
    'Nº', 'PERGUNTA',
    'RESPOSTA 0', 'RESPOSTA 1', 'RESPOSTA 2', 'RESPOSTA 3',
    'GABARITO: 0,1,2,3', 'Tema: 0,1,2,3', 'Ilustração'
]

for arquivo, modulo, idioma_padrao in arquivos:
    print(f"\n➡️ Importando {arquivo}...")

    xls = pd.ExcelFile(arquivo)

    for i, sheet_name in enumerate(xls.sheet_names):
        nivel = i + 1  # nível definido pela ordem da aba
        print(f"  - Processando aba: {sheet_name} (nível {nivel})")

        df = pd.read_excel(xls, sheet_name=sheet_name)
        df.columns = [str(col).strip() for col in df.columns]

        # Verifica se todas as colunas existem
        colunas_faltando = [col for col in colunas_esperadas if col not in df.columns]
        if colunas_faltando:
            print(f"❌ Colunas faltando na aba {sheet_name} do arquivo {arquivo}: {colunas_faltando}")
            continue  # pula essa aba

        for idx, row in df.iterrows():
            try:
                # Pula linhas com campos obrigatórios ausentes
                if pd.isnull(row['Nº']) or pd.isnull(row['GABARITO: 0,1,2,3']) or pd.isnull(row['Tema: 0,1,2,3']):
                    print(f"❌ Linha {idx} ignorada por dados obrigatórios ausentes na aba {sheet_name}")
                    continue

                Perguntas.objects.create(
                    modulo=modulo,
                    nivel=nivel,
                    numero=int(row['Nº']),
                    pergunta=row['PERGUNTA'],
                    resposta_0=row['RESPOSTA 0'],
                    resposta_1=row['RESPOSTA 1'],
                    resposta_2=row['RESPOSTA 2'],
                    resposta_3=row['RESPOSTA 3'],
                    gabarito=int(row['GABARITO: 0,1,2,3']),
                    tema=int(row['Tema: 0,1,2,3']),
                    idioma=idioma_padrao,
                    ilustracao=row['Ilustração']
                )
            except Exception as e:
                print(f"❌ Erro na linha {idx} da aba {sheet_name}: {e}")

    print(f"✅ Importado com sucesso: {arquivo}")
