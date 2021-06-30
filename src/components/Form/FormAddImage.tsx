import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const schema = yup.object().shape({
    image: yup.mixed()
      .test('lessThan10MB',
        'O arquivo deve ser menor que 10MB', (values) => values && values[0]?.size > 10000)
      .test('acceptedFormats', 'Somente são aceitos arquivos PNG, JPEG e GIF', value => value && value[0].type !== 'image/png')
    // .test('lessThan10MB','O arquivo deve ser menor que 10MB', (values)=> values[0].size <= 10000)
    // .test('required', 'Arquivo obrigatório', values => values == null)
  })

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
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger
  } = useForm({
    resolver: yupResolver(schema)
  });
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    console.log('chamou')
    // console.log(data.image)
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
      reset(data)
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
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
          {...register('image')}

        />
        <h1>{errors.image?.message}</h1>
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
