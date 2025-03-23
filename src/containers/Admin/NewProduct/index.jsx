import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Image } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { api } from '../../../services/api';
import {
  Container,
  ErrorMenssage,
  Form,
  Input,
  InputGroup,
  Label,
  LabelUpload,
  Select,
  SubmitButton,
} from './styled';

const schema = yup.object({
  name: yup.string().required(),
  price: yup.number().positive().required(),
  category: yup.string().required(),
  file: yup.mixed(),
});

export function NewProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadcategories() {
      const { data } = await api.get('/categories');

      setCategories(data);
    }

    loadcategories();
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMenssage>{errors?.name?.message}</ErrorMenssage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMenssage>{errors?.price?.message}</ErrorMenssage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <Image />
            <input
              type="file"
              {...register('file')}
              accept="image/png, image/jpeg"
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
                register('file').onChange(value);
              }}
            />

            {fileName || 'Upload do produto'}
          </LabelUpload>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            render={(field) => (
              <Select
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
              />
            )}
          />
        </InputGroup>

        <SubmitButton>Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
