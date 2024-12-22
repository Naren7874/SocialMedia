import { Skeleton, SkeletonCircle, SkeletonText,  Flex } from "@chakra-ui/react";

const UserPostSkeleton = () => {
  return (
    <Flex gap={3} mb={4} py={5}>
      {/* Left Side - Avatar */}
      <SkeletonCircle size="12" />

      {/* Right Side - Post Content */}
      <Flex flex={1} flexDirection={"column"} gap={2}>
        {/* Header - Username and Timestamp */}
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex alignItems={"center"} gap={2}>
            <Skeleton height="20px" width="80px" />
            <SkeletonCircle size="4" />
          </Flex>
          <Skeleton height="16px" width="24px" />
        </Flex>

        {/* Post Title */}
        <SkeletonText noOfLines={1} width="60%" />

        {/* Post Image (if present) */}
        <Skeleton height="180px" borderRadius={6} />

        {/* Actions (like, comment icons) */}
        <Flex gap={2} mt={2}>
          <Skeleton height="20px" width="20px" borderRadius="full" />
          <Skeleton height="20px" width="20px" borderRadius="full" />
          <Skeleton height="20px" width="20px" borderRadius="full" />
        </Flex>

        {/* Post Stats (e.g., likes and comments) */}
        <Flex gap={2} alignItems={"center"}>
          <Skeleton height="16px" width="60px" />
          {/* <Box w={1} h={1} bg={"gray.300"} borderRadius={"full"} /> */}
          <Skeleton height="16px" width="60px" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserPostSkeleton;
