import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Text
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent maxWidth={600} maxHeight={900}>
    <ModalBody>
      <Image  src={imgUrl}/>
    </ModalBody>
    <ModalFooter bgColor="pGray.800">
      <Link 
        href={imgUrl} 
        isExternal
        >
         Abrir original
           </Link>
    </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
