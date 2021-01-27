import React from 'react'
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import SignIn from './SignIn'
import SignUp from './SignUp'

function Login() {
  return (
    <Box p="50px" pb="30px" bg="white" borderRadius="4px" boxShadow="lg">
      <Tabs align="center" colorScheme="red">
        <TabList mb="50px" borderBottomColor="transparent">
          <Tab
            fontWeight="700"
            _focus={{ boxShadow: 'none' }}
            _active={{ background: 'transparent' }}
          >
            登录
          </Tab>
          <Tab
            fontWeight="700"
            _focus={{ boxShadow: 'none' }}
            _active={{ background: 'transparent' }}
          >
            注册
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0">
            <SignIn />
          </TabPanel>
          <TabPanel p="0">
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Login
