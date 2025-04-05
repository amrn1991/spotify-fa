'use client'

import NextImage from 'next/image';
import {Box, Flex, Input, Button} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {FormEvent, useState} from 'react';
import {auth} from '@/lib/mutations';

const AuthForm = ({mode}: {mode: 'signin' | 'signup'}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, {email, password});
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex justify="center" align="center" height="100px" borderBottom="white 1px solid">
        <NextImage src="/icon.svg" height={30} width={90} alt="" />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input marginBlock="2" placeholder="ایمیل" type="email" onChange={(e) => setEmail(e.target.value)} />
            <Input marginBlock="2" placeholder="رمز عبور" type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button
              type="submit"
              bg="green.500"
              loading={isLoading}
              css={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}>
              {mode === 'signin' ? 'ورود' : 'ثبت نام'}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
