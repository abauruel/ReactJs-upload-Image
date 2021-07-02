import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';


type dataInput ={
  title: string | unknown,
  description: string | unknown,
  url: string
}



interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();



  const formValidations = {
    image: {
      required: { value: true, message: 'Arquivo obrigatório' }

      // validate: {
      // lessThan10MB: value => value[0]?.size > 1,
      // acceptedFormats: value => value[0]?.type.match(/image\/png|image\/jpeg|image\/gif/)?.length > 0
      // }

    }
    // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
    ,
    title: {
      required: { value: true, message: 'Título obrigatório' },
      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
      maxLength: { value: 20, message: 'Máximo de 20 caracteres' }
    }
    // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
    ,
    description: {
      required: { value: true, message: 'Descrição obrigatória' },
      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
      maxLength: { value: 20, message: 'Máximo de 20 caracteres' }

    }
    // TODO REQUIRED, MAX LENGTH VALIDATIONS
    ,
  }

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (data: dataInput) => await api.post('/api/images',data),
    {
      // TODO ONSUCCESS MUTATION\
      onSuccess: async()=> { queryClient.invalidateQueries('images')}
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {

    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if(!imageUrl){
        toast({
          title:'Imagem não adicionada',
          description:'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'error',
          isClosable: true
        })
        throw new Error()
      }

      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync({
        description: data.description,
        title: data.title ,
        url: imageUrl
      })
      // TODO SHOW SUCCESS TOAST
       toast({
          title:'Imagem cadastrada',
          description:'Sua imagem foi cadastrada com sucesso.',
          status: 'success',
          isClosable: true
        })
        closeModal()
       
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
 
        toast({
          title:'Falha no cadastro',
          description:'Ocorreu um erro ao tentar cadastrar a sua imagem.',
          status: 'error',
          isClosable: true
        })
      
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset(data)
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS
          error={errors.image}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register('image',{
            required: {value: true, message: 'Arquivo obrigatório'},
            validate: {
              lessThan10MB: value => parseInt(value[0]?.size) > 10000 || 'O arquivo deve ser menor que 10MB',
              acceptedFormats: value => value[0]?.type?.match(/image\/png|image\/jpeg|image\/gif/)?.length > 0 || 'Somente são aceitos arquivos PNG, JPEG e GIF'
            }
          })}

        />
       
        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          error={errors.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          error={errors.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
