import React, { FC, useMemo } from 'react';
import {
  Avatar,
  Button,
  HStack,
  Link as NBLink,
  Switch,
  Text,
  Tooltip,
  useColorMode,
  VStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { HLogoText } from '@depub/theme';
import { useNavigation } from '@react-navigation/native';
import type { SideMenuItemProps } from './SideMenuItem';
import { SideMenuItem } from './SideMenuItem';
import { ConnectWalletButton } from '../../atoms/ConnectWalletButton';
import type { DesmosProfile } from '../../../interfaces';
import { getAbbrNickname, getLikecoinAddressByProfile, getShortenAddress } from '../../../utils';
import type { HomeScreenNavigationProps } from '../../../screens';

export interface SideMenuProps extends DrawerContentComponentProps {
  onLogout?: () => void;
  isLoading?: boolean;
  walletAddress: string | null;
  menuItems: SideMenuItemProps[];
  profile: DesmosProfile | null;
}

export const SideMenu: FC<SideMenuProps> = ({
  onLogout,
  isLoading,
  walletAddress,
  menuItems,
  profile,
  ...props
}) => {
  const isLogged = Boolean(walletAddress);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const isDarkMode = colorMode === 'dark';
  const likecoinAddress = profile && getLikecoinAddressByProfile(profile);
  const shortenAddress =
    walletAddress &&
    getShortenAddress(`${walletAddress.slice(0, 10)}...${walletAddress.slice(-4)}`);
  const displayName = profile?.nickname || profile?.dtag || shortenAddress;
  const abbrNickname = getAbbrNickname(displayName || '');
  const profilePicSource = useMemo(
    () => (profile ? { uri: profile.profilePic } : undefined),
    [profile]
  );

  const handleOnConnect = () => {
    navigation.navigate('ConnectWallet');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <VStack
        flex={1}
        h="100vh"
        justifyContent="space-between"
        px={{
          base: 4,
          md: 6,
        }}
        py={6}
      >
        <HStack justifyContent="flex-start" pl={4}>
          <NBLink
            _dark={{
              color: 'white',
            }}
            _light={{
              color: 'black',
            }}
            href="/"
          >
            <HLogoText width={190} />
          </NBLink>
        </HStack>
        <VStack mb="auto" mt={{ base: 8, md: 12 }} space={2}>
          {menuItems.map(menuItemProps => (
            <SideMenuItem key={menuItemProps.name} {...menuItemProps} />
          ))}

          <SideMenuItem
            icon={<MaterialIcons />}
            iconName="nightlight-round"
            onPress={() => toggleColorMode()}
          >
            <HStack alignItems="center" flex={1} justifyContent="space-between">
              <Text fontWeight="bold">Night Mode</Text>
              <Switch isChecked={isDarkMode} size="md" onToggle={() => toggleColorMode()} />
            </HStack>
          </SideMenuItem>
        </VStack>

        {isLogged ? (
          <VStack space={4}>
            <HStack alignItems="center" flex={1} space={3}>
              <Avatar
                borderColor={likecoinAddress ? 'primary.500' : 'gray.200'}
                borderWidth={2}
                size="sm"
                source={profilePicSource}
              >
                {abbrNickname}
              </Avatar>
              <VStack flex={1}>
                <Tooltip label={displayName || ''}>
                  <Text
                    flex={1}
                    fontSize="sm"
                    fontWeight="bold"
                    minW={0}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {displayName}
                  </Text>
                </Tooltip>
                <Tooltip label={walletAddress || ''}>
                  <Text
                    color="gray.500"
                    flex={1}
                    fontSize="sm"
                    minW={0}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {walletAddress}
                  </Text>
                </Tooltip>
              </VStack>
            </HStack>

            <Button variant="outline" onPress={onLogout}>
              Logout
            </Button>
          </VStack>
        ) : (
          <ConnectWalletButton isLoading={isLoading} onPress={handleOnConnect} />
        )}
      </VStack>
    </DrawerContentScrollView>
  );
};
