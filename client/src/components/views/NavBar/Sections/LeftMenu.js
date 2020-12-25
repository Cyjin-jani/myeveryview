import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)

  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">
        메인
      </a>
    </Menu.Item>
    <Menu.Item key="scrap" style={{paddingBottom: 3}}>
          <Badge count={user.userData && user.userData.scrap && user.userData.scrap.length }>
            <a href="/user/scrap" style={{marginRight: -22, color: '#667777'}}> 
              <Icon type="book" style={{fontSize: 30, marginBottom: 3, color: 'white'}}></Icon>
            </a>
          </Badge>
        </Menu.Item>
    {/* <SubMenu title={<span>Blogs</span>}> 
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu> */}
  </Menu>
  )
}

export default LeftMenu