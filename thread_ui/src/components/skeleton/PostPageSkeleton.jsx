// PostPageSkeleton.jsx
import { Avatar, Box, Divider, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

const PostPageSkeleton = () => {
  return (
    <Box padding="5" maxWidth="600px" margin="0 auto">
      {/* Header Skeleton */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex alignItems="center" gap={3}>
          <SkeletonCircle size="10" />
          <Flex direction="column" gap="1">
            <Skeleton height="4" width="20" />
            <Skeleton height="3" width="12" />
          </Flex>
        </Flex>
        <Skeleton height="4" width="8">
          <BsThreeDots color="gray.300" />
        </Skeleton>
      </Flex>

      {/* Post Content Skeleton */}
      <SkeletonText mt="4" noOfLines={3} spacing="3" />

      {/* Image Skeleton */}
      <Skeleton mt="4" height="250px" borderRadius="md" />

      {/* Post Stats Skeleton */}
      <Flex gap={3} alignItems="center" my={4}>
        <Skeleton height="4" width="10" />
        <Box w={1} h={1} bg="gray.300" borderRadius="full" />
        <Skeleton height="4" width="10" />
      </Flex>

      <Divider my={4} />

      {/* CTA Section Skeleton */}
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap={2} alignItems="center">
          <SkeletonCircle size="8" />
          <Skeleton height="4" width="32" />
        </Flex>
        <Skeleton height="8" width="20" borderRadius="md" />
      </Flex>
    </Box>
  );
};

export default PostPageSkeleton;
