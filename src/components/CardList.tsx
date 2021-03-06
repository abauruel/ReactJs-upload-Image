import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const {isOpen, onClose, onOpen} = useDisclosure()

  // TODO SELECTED IMAGE URL STATE
 const [imageUrl, setImageUrl] = useState("")
 
  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string){
    
    setImageUrl(url)
    onOpen()
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={40}>
        {cards?.map((card, index) => (
          <Card 
          key={index}
            data={card} 
            viewImage={()=>handleViewImage(card.url)}/>
        ))}
      </SimpleGrid>

      {<ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl}  />}
    </>
  );
}
