// widgets/icosCard/IcosCard.tsx
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import type { IcosT } from '@/entities/icos/model/types';

type IcosCardProps = {
  icos: IcosT;
  onAddToBasket?: (id: number) => void;
};

export default function IcosCard({ icos, onAddToBasket }: IcosCardProps): React.JSX.Element {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={icos.image ?? '/default-image.jpg'} />
      <Card.Body>
        <Card.Title>{icos.name}</Card.Title>
        <Card.Text>{icos.description}</Card.Text>
        <Card.Text className="text-primary fw-bold">{icos.price} ₽</Card.Text>
        <Button 
          variant="primary" 
          onClick={() => onAddToBasket?.(icos.id)}
        >
          В корзину
        </Button>
      </Card.Body>
    </Card>
  );
}