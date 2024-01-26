import { FC } from 'react'
import { Layout, Flex } from 'antd'
import { MailOutlined } from '@ant-design/icons'

const { Footer, Content } = Layout

const Branding: FC<any> = ({ children }) => {
  return (
    <Layout>
      <Content style={{ background: 'transparent' }}>
        {children}
      </Content>
      <Footer style={{ background: 'transparent' }}>
        <Flex gap={48} style={{ color: 'grey' }}>
          <text>© 2023 {<a id='link-blanknode' href='https://blanknode.dev/' target='_blank' rel="noreferrer">Blank Node</a>}. All rights reserved</text>
          <Flex gap={6}>
            <MailOutlined />
            {<a id='link-blanknode' href='mailto:info@blanknode.dev/' target='_blank' rel="noreferrer">get in touch</a>}
          </Flex>
        </Flex>
      </Footer>
    </Layout>
  )
}

export default Branding