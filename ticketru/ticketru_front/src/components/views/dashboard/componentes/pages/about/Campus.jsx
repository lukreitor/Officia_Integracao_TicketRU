import { Carousel, Card } from 'react-bootstrap';

const campuses = [
    {
        title: 'Apucarana',
        address: 'Rua Marcílio Dias, 635',
        neighborhood: 'Apucarana - PR - Brasil',
        cep: 'CEP 86812-460',
        phone: 'Telefone: +55 (43) 3162-1200',
        image: 'https://commons.wikimedia.org/wiki/File:C%C3%A2mpus_Apucarana_UTFPR.jpg'
    },
    {
        title: 'Campo Mourão',
        address: 'VIA ROSALINA MARIA DOS SANTOS, 1233',
        neighborhood: 'Campo Mourão - PR - Brasil',
        cep: 'CEP 87301-899',
        phone: 'Telefone: +55 (44) 3518-1400',
        image: 'Image_link_here'
    },
    {
        title: 'Curitiba',
        address: 'Av. Sete de Setembro, 3165 - Rebouças',
        neighborhood: 'Curitiba - PR - Brasil',
        cep: 'CEP 80230-901',
        phone: 'Telefone: +55 (41) 3310-4545',
        image: 'Image_link_here'
    },
    {
        title: 'Francisco Beltrão',
        address: 'Caixa Postal 135',
        neighborhood: 'Francisco Beltrão - Paraná - Brasil',
        cep: 'CEP: 85602-863',
        phone: 'Telefone: +55 (46) 3520-2600',
        image: 'Image_link_here' // Replace 'Image_link_here' with the actual link when you find it
    }
];

function Campus() {
    return (
        <Carousel>
            {campuses.map((campus, index) => (
                <Carousel.Item key={index}>
                    <Card>
                        <Card.Header>{campus.title}</Card.Header>
                        <Card.Img variant="top" src={campus.image} />
                        <Card.Footer>
                            <p>{campus.address}</p>
                            <p>{campus.neighborhood}</p>
                            <p>{campus.cep}</p>
                            <p>{campus.phone}</p>
                        </Card.Footer>
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Campus;
