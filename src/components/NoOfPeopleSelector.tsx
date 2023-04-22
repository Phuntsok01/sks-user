import { Button, chakra, HStack } from '@chakra-ui/react'
import React from 'react'

type noOfPeopleSelectorProps = {
  noOfPeople: number
  setNoOfPeople: React.Dispatch<React.SetStateAction<number>>
}

const NoOfPeopleSelector = ({
  noOfPeople,
  setNoOfPeople,
}: noOfPeopleSelectorProps) => {
  const options = [1, 2, 4, 6, 8]
  return (
    <HStack justifyContent={'center'} width={'100%'} gap={['0.5rem', '1rem']}>
      {options.map((option, index) => (
        <Button
          key={index}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          padding={['0.5rem 1rem', '1.5rem']}
          width={'100%'}
          height={'100%'}
          fontSize={'1.2rem'}
          borderRadius={'6px'}
          fontWeight={'bold'}
          colorScheme={'whatsapp'}
          variant={noOfPeople === option ? 'solid' : 'outline'}
          onClick={() => setNoOfPeople(option)}
        >
          <chakra.span>{option}</chakra.span>
        </Button>
      ))}
    </HStack>
  )
}

export default NoOfPeopleSelector
