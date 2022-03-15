import { useContext } from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { InboxOutlined, MailOutlineOutlined } from '@mui/icons-material';

import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{width: 250}}>
        <Box sx={{padding: '5px 10px'}}>
          <Typography variant='h4'>Menú</Typography>
        </Box>

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem key={text} button>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlined /> : <MailOutlineOutlined /> }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem key={text} button>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlined /> : <MailOutlineOutlined /> }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}
