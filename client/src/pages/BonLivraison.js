import React from 'react'
import Layout from "./../components/Layout"
import {Col, Form, Row, Table} from 'antd';

const BonLivraison = () => {
    
const columns = [
  {title: 'Code Livraison',dataIndex: 'codeLivraison',key: 'codeLivraison'},
  {title: 'code Inventaire',dataIndex: 'codeInventaire',key: 'codeInventaire'},
  {title: 'Nom Matériel',dataIndex: 'nomMateriel',key: 'nomMateriel'},
  {title: 'Type',dataIndex: 'type',key: 'type'},
  {title: 'Série', dataIndex: 'serie', key:'serie'},
  {title: 'Modèle', dataIndex:'modele', key:'modele'},
  {title: 'Etat', dataIndex:'etat', key:'etat'},
  {title: 'Emplacement', dataIndex:'emplacement', key:'emplacement'},
  {title: 'Quantité', dataIndex: 'quantite', key: 'quantite'},
  {title: 'Prix Unitaire', dataIndex: 'prixUnitaire', key: 'prixUnitaire'},
  {title: 'Prix Totale', dataIndex: 'prixTotale', key:'prixTotale'},
  {title: "Date d'Entrée", dataIndex:'dateEntre', key:'dateEntre'}
];

const data = [
  {codeLivraison: 'L-01',codeInventaire: '1',nomMateriel: 'Micro-Ordinateur',typeMateriel: 'Informatique', quantite:''},
];
    
    return (
    <Layout>
        <h1 className="text-center" style={{paddingTop: '50px'}}>Bon de Livraison</h1>
        <Form layout="vertical" className='m-5'>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={24} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                    <Table columns={columns} dataSource={data} />
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default BonLivraison;