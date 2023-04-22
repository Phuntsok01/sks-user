import { chakra, VStack, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { TbDivide, TbEqual } from 'react-icons/tb'
type billSplitpProps = {
  grandTotal: number
  noOfPeople: number
}
const BillSplit = ({ grandTotal, noOfPeople }: billSplitpProps) => {
  if (noOfPeople <= 0) {
    return (
      <chakra.p>
        This application assums that you know some basic maths!
      </chakra.p>
    )
  }

  return (
    <VStack width={'100%'} gap={'1rem'}>
      <HStack width={'full'} justifyContent={'center'} marginTop={'1rem'}>
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.1,
            type: 'spring',
          }}
        >
          <VStack
            justifyContent={'center'}
            width={'fit-content'}
            // background={'green.400'}
            outline={'1px solid green'}
            borderRadius={'6px'}
            padding={['0.5rem 1rem', '1rem 1.5rem']}
            color={'#000'}
            fontWeight={'bold'}
          >
            <chakra.span>{'Rs. ' + grandTotal}</chakra.span>
          </VStack>
        </motion.div>
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: 'spring',
          }}
        >
          <TbDivide size={32} />
        </motion.div>
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: 'spring',
          }}
        >
          <VStack
            justifyContent={'center'}
            padding={['0.5rem 1rem', '1rem 1.5rem']}
            width={'fit-content'}
            // background={'green.400'}
            outline={'1px solid green'}
            borderRadius={'6px'}
            color={'#000'}
            fontWeight={'bold'}
          >
            <chakra.span>{noOfPeople}</chakra.span>
          </VStack>
        </motion.div>
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
            type: 'spring',
          }}
        >
          <TbEqual />
        </motion.div>
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: 'spring',
          }}
        >
          <VStack
            justifyContent={'center'}
            padding={['0.5rem 1rem', '1rem 1.5rem']}
            width={'fit-content'}
            background={'green.400'}
            borderRadius={'6px'}
            color={'#fff'}
            fontWeight={'bold'}
          >
            <chakra.span>
              {'Rs. ' + (grandTotal / noOfPeople).toFixed(2)}
            </chakra.span>
          </VStack>
        </motion.div>
      </HStack>
    </VStack>
  )
}

export default BillSplit
