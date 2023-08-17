import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
  address: string;
}

export function AccountForm() {
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
    console.log(values);
  };

  return (
    <Box mx="auto">
      <p>Enter wallet address to view Cryptopunks inventory</p>
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
