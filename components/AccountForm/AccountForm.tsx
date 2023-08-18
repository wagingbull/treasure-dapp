import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  address: string;
}

interface AccountFormProps {
  title: string;
  onSubmit: Function;
}

export function AccountForm({ title, onSubmit }: AccountFormProps) {
  const form = useForm({
    initialValues: {
      address: '',
    },

    validate: {
      address: value => {
        const isValidETHAddress = /^(0x)?[0-9a-fA-F]{40}$/.test(value);
        const isValidENS = /^[a-zA-Z0-9-]+\.eth$/.test(value);

        return isValidETHAddress || isValidENS
          ? null
          : 'Invalid Ethereum address or ENS name';
      },
    },
  });

  const onSubmitHandler = async (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Box mx="auto">
      <p>{title}</p>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <TextInput
          withAsterisk
          placeholder="wallet address"
          {...form.getInputProps('address')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
