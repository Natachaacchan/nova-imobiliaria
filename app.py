from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '18_Maeda',
    'database': 'nova_imobiliaria'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/dados', methods=['GET'])
def get_dados():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT 
        p.id_pagamento, 
        p.data_pagamento, 
        p.valor AS valor_do_pagamento, 
        i.id_imovel AS codigo_imovel, 
        i.descricao AS descricao_imovel, 
        t.descricao AS tipo_imovel
    FROM 
        pagamento p
    JOIN 
        imovel i ON p.imovel_id = i.id_imovel
    JOIN 
        tipo_imovel t ON i.tipo_imovel_id = t.id_tipo;
    """

    cursor.execute(query)
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
