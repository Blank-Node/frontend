import { FC } from 'react'
import { Flex, Divider } from 'antd'
import { MailOutlined, LinkedinOutlined } from '@ant-design/icons'

import AnimatedLines from '../Viz/AnimatedLines'

const Branding: FC<any> = ({ children }) => {
  return (
    <>
      {/* {children} */}
      <AnimatedLines />
      <Divider style={{ border: '1px solid grey' }}/>
      <Flex gap={48} style={{ color: 'grey' }}>
        <text>© 2023 {<a id='link-blanknode' href='https://blanknode.dev/' target='_blank' rel="noreferrer">Blank Node</a>}. All rights reserved</text>
        <Flex gap={8}>
          <MailOutlined />
          {<a id='link-blanknode' href='mailto:info@blanknode.dev/' target='_blank' rel="noreferrer">get in touch</a>}
        </Flex>
        <Flex gap={8}>
          <LinkedinOutlined />
          {<a id='link-blanknode' href='https://www.linkedin.com/company/blank-node/' target='_blank' rel="noreferrer">LinkedIn</a>}
        </Flex>
      </Flex>
    </>
  )
}

export default Branding