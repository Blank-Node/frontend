import { FC, CSSProperties } from 'react'
import { Flex, Divider, Space, Typography } from 'antd'
import { MailOutlined, LinkedinOutlined } from '@ant-design/icons'

interface Style {
  [key: string]: CSSProperties;
}
const { Text, Title } = Typography

const Branding: FC<any> = ({ children }) => {
  return (
    <>
      <Flex className='full' gap={12} style={s.header}>
        <Title className='blink' style={s.icon}>{'_'}</Title>
        <Title style={s.icon}>{':'}</Title>
        <Title style={s.title}>{'Blank Node'}</Title>
      </Flex>
      
      {children}

      <div style={{ bottom: 0, padding: '0em 1em' }}>
        <Divider style={s.divider}/>
        <Flex justify='space-between' style={{ color: 'lightGrey' }} wrap='wrap'>
          <Text style={s.text}>© 2023-2024 {<a id='link-blanknode' href='https://blanknode.dev/' target='_blank' rel="noreferrer">Blank Node</a>}. All rights reserved</Text>

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

const s: Style = {
  header:{
    margin: '0.5em 1em', 
    position: 'absolute', 
    top: 0
  },
  icon: {
    color: 'lightGrey',
    fontWeight: 600,
    margin: 0,
    marginBlock: 0
  },
  title: {
    color: 'lightGrey',
    fontWeight: 300,
    margin: 0,
    marginBlock: 0
  },
  text:{
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    color: 'lightGrey',
    fontWeight: 400,
    fontSize: '1em',
  },
  divider: { 
    border: '1px solid grey', 
    marginBottom: '1em' 
  }
}