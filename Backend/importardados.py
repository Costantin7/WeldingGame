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
        df.columns = [str(col).strip() for col in df.columns]

        colunas_faltando = [col for col in colunas_obrigatorias if col not in df.columns]
        if colunas_faltando:
            print(f"❌ Colunas obrigatórias faltando na aba {sheet_name}: {colunas_faltando}. Pulando aba.")
            continue

        for idx, row in df.iterrows():
            try:
                if pd.isnull(row['Nº']) or pd.isnull(row['GABARITO: 0,1,2,3']) or pd.isnull(row['Tema: 0,1,2,3']):
                    print(f"⚠️ Linha {idx+2} ignorada por dados obrigatórios ausentes na aba {sheet_name}")
                    continue

                # ==================== A ÚNICA MUDANÇA É ESTA LINHA ====================
                # Trocamos 'create' por 'update_or_create'
                
                obj, created = Perguntas.objects.update_or_create(
                    # 1. Estes são os campos para ENCONTRAR a pergunta:
                    modulo=modulo,
                    nivel=nivel,
                    numero=int(row['Nº']),
                    
                    # 2. 'defaults' contém os dados para ATUALIZAR ou CRIAR:
                    defaults={
                        'pergunta': row.get('PERGUNTA'),
                        'resposta_0': row.get('RESPOSTA 0'),
                        'resposta_1': row.get('RESPOSTA 1'),
                        'resposta_2': row.get('RESPOSTA 2'),
                        'resposta_3': row.get('RESPOSTA 3'),
                        'gabarito': int(row['GABARITO: 0,1,2,3']),
                        'tema': int(row['Tema: 0,1,2,3']),
                        'idioma': idioma_padrao,
                        'ilustracao': row.get('Ilustração') if 'Ilustração' in df.columns and pd.notna(row.get('Ilustração')) else None,
                        'explicacao': row.get('Explicação') if 'Explicação' in df.columns and pd.notna(row.get('Explicação')) else None,
                    }
                )
                # ======================== FIM DA MUDANÇA ========================

                if created:
                    print(f"   ✓ Criada: Módulo {modulo}, Nível {nivel}, Nº {int(row['Nº'])}")
                else:
                    print(f"   → Atualizada: Módulo {modulo}, Nível {nivel}, Nº {int(row['Nº'])}")

            except Exception as e:
                print(f"❌ Erro ao processar linha {idx+2} da aba {sheet_name}: {e}")

    print(f"✅ Importação de {arquivo} concluída.")