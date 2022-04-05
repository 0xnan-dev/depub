import { Text, Stack, Heading, Image, AspectRatio, IBoxProps, Link, ITextProps } from 'native-base';
import React, { FC, useMemo } from 'react';
import { LinkPreviewItem } from '../../../interfaces';

const textOverflowStyle: ITextProps = {
  flex: 1,
  minW: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export interface LinkPreviewProps extends IBoxProps {
  preview: LinkPreviewItem;
}

export const LinkPreview: FC<LinkPreviewProps> = ({ preview }) => {
  const imageSource = useMemo(() => {
    let imageSourceURI: { uri: string } | undefined;

    if (preview && preview.images) {
      imageSourceURI = {
        uri: preview.images[0],
      };
    }

    return imageSourceURI;
  }, [preview]);

  return (
    <Link display="flex" flex="1" href={preview.url} isExternal>
      <Stack
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
        borderColor="coolGray.200"
        borderWidth="1"
        flex={1}
        overflow="hidden"
        rounded="lg"
      >
        {imageSource ? (
          <AspectRatio ratio={16 / 9} w="100%">
            <Image alt="image" source={imageSource} />
          </AspectRatio>
        ) : null}
        <Stack
          _dark={{
            backgroundColor: 'gray.600',
          }}
          _light={{
            backgroundColor: 'gray.100',
          }}
          flex={1}
          p={3}
          space={1}
        >
          <Text color="gray.400" fontSize="xs" fontWeight="500" {...textOverflowStyle}>
            {preview.url}
          </Text>
          <Heading
            _dark={{ color: 'white' }}
            _light={{ color: 'black' }}
            fontSize="md"
            {...textOverflowStyle}
          >
            {preview.title || preview.url}
          </Heading>
          {preview.description ? (
            <Text fontSize="md" {...textOverflowStyle}>
              {preview.description}
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </Link>
  );
};
