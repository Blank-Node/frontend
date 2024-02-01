import { FC } from 'react'
import { Flex, Divider, Space } from 'antd'
import { MailOutlined, LinkedinOutlined } from '@ant-design/icons'

import AnimatedLines from '../Viz/AnimatedLines'

const Branding: FC<any> = ({ children }) => {
  return (
    <>
      <Flex className='full' style={{ marginBottom: '1em' }}>
        <img src={'./img/BN__icon_300.png'} className="logo-small" alt="Blank Node" />
      </Flex>
      {/* {children} */}
      <div style={{ height: window.innerHeight - 160 }}>
        <AnimatedLines />
      </div>

      <div style={{ bottom: 0 }}>
        <Divider style={{ border: '1px solid grey' }}/>
        <Flex justify='space-between' style={{ color: 'grey' }}>
          <text>© 2023 {<a id='link-blanknode' href='https://blanknode.dev/' target='_blank' rel="noreferrer">Blank Node</a>}. All rights reserved</text>

          <Space size={48}>
            <Space direction='horizontal' size={8}>
              <MailOutlined />
              {<a id='link-blanknode' href='mailto:info@blanknode.dev/' target='_blank' rel="noreferrer">get in touch</a>}
            </Space>
            <Space direction='horizontal' size={8}>
              <LinkedinOutlined />
              {<a id='link-blanknode' href='https://www.linkedin.com/company/blank-node/' target='_blank' rel="noreferrer">LinkedIn</a>}
            </Space>
          </Space>
        </Flex>
      </div>
    </>
  )
}

export default Branding