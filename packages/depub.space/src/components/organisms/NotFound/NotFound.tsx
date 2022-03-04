import { Center, Text, Heading, VStack, View, Button } from 'native-base';
import React, { FC } from 'react';
import { LogoIconText } from '@depub/theme';
import { Link } from '@react-navigation/native';

export const NotFound: FC = () => (
  <View alignItems="center" flex={1} justifyContent="center" pt={8}>
    <VStack alignItems="center" space={8}>
      <LogoIconText height={180} width={180} />
      <Center>
        <Heading color="black" fontSize="9xl">
          404
        </Heading>
        <Text>Page Not Found</Text>
      </Center>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to="Home">
        <Button variant="outline">Back home</Button>
      </Link>
    </VStack>
  </View>
);
