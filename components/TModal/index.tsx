'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'

//import Image from "next/image";
import { VStack, Flex, Box, IconButton } from '@chakra-ui/react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons'
import { BsBack } from 'react-icons/bs'
import { BiDotsVerticalRounded, BiFile, BiNetworkChart } from 'react-icons/bi'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ChakraProvider,
  Tooltip,
} from '@chakra-ui/react'
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';
import { MyGrid } from './TextGrid'
import { SelectId } from './SelectId'

function TModal(props) {
  const layout = props.layout
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Tooltip label={isOpen ? 'Close modal' : 'Open modal'}>
        <IconButton
          m={1}
          // eslint-disable-next-line react/jsx-no-undef
          icon={<BsBack />}
          aria-label="Close modal view"
          variant="subtle"
          onClick={isOpen ? onClose : onOpen}
        />
      </Tooltip>
    <Modal isOpen={isOpen} onClose={onClose} size="full" >
      <ModalOverlay  />
      <ModalContent height="70%">
        <SelectId options={ ["лпордлро", "длопждло"] } />
        <ModalCloseButton />
        <Scrollbars>
          <ModalBody>
            <MyGrid layout={layout} />
          </ModalBody>
        </Scrollbars>

        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default TModal
