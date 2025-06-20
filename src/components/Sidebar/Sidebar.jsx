import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];


const SidebarContainer = styled.div`
  position: relative;
  width: ${props => props.$opened ? '220px' : '70px'};
  background: ${props => props.theme.sidebarBg};
  color: ${props => props.theme.text};
  transition: width 0.5s cubic-bezier(.4,0,.2,1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  overflow: ${props => props.$overflowHidden ? 'hidden' : 'visible'};
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 16px 16px 16px;
  gap: 12px;
`;

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  color: ${props => props.theme.logo};
  font-weight: bold;
  font-size: 1.2em;
  opacity: ${props => props.$opened ? 1 : 0};
  transition: opacity 0.4s cubic-bezier(.2,0,.2,1);
  white-space: nowrap;
`;

const ToggleBtn = styled.button`
  position: absolute;
  top: 20px;
  right: ${props => props.$opened ? '-15px' : '-60px'};
  width: 40px;
  height: 40px;
  background: ${props => props.theme.toggleBg};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: right 0.5s cubic-bezier(.4,0,.2,1), background 0.2s;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);

  &:hover {
    background: ${props => props.theme.toggleBgHover};
    svg {
      color: ${props => props.theme.toggleIconHover};
    }
  }
  &:active {
    background: ${props => props.theme.toggleBgActive};
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  transition: transform 0.5s cubic-bezier(.4,0,.2,1), color 0.2s;
  transform: rotate(${props => props.$opened ? '0deg' : '180deg'});
  color: ${props => props.theme.toggleIcon};
`;


const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  color: ${props => props.$active ? props.theme.textActive : props.theme.text};
  background: ${props => props.$active ? props.theme.sidebarActive : 'transparent'};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${props => props.theme.sidebarHover};
    color: ${props => props.theme.textHover};
  }
span {
  opacity: ${props => props.$opened ? 1 : 0};
  transition: opacity 0.4s cubic-bezier(.2,0,.2,1);
  white-space: nowrap;
}
`;

const ANIMATION_DURATION = 500;


const Sidebar = () => {
    const [isOpened, setIsOpened] = useState(true);
    const [activePath, setActivePath] = useState('/');
    const [overflowHidden, setOverflowHidden] = useState(true);

        useEffect(() => {
        if (isOpened) {
            // Ставим overflow: hidden с задержкой после анимации
            const timeout = setTimeout(() => setOverflowHidden(true), ANIMATION_DURATION);
            return () => clearTimeout(timeout);
        } else {
            // При закрытии сразу убираем overflow: hidden
            setOverflowHidden(false);
        }
    }, [isOpened]);

    const goToRoute = (path) => {
        setActivePath(path);
    };

    return (
        <SidebarContainer $overflowHidden={overflowHidden} $opened={isOpened}>
            <div>
                <ToggleBtn $opened={isOpened} onClick={() => setIsOpened(v => !v)}>
                    <ArrowIcon icon="angle-left" $opened={isOpened} />
                </ToggleBtn>            
                <LogoRow>
                    <LogoImg src={logo} alt="Logo"/>
                    <LogoText $opened={isOpened}>TensorFlow</LogoText>

                </LogoRow>
                <NavSection>
                    {routes.map(route => (
                        <NavItem
                            key={route.title}
                            $opened={isOpened}
                            $active={activePath === route.path}
                            onClick={() => goToRoute(route.path)}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                </NavSection>
            </div>
            <div>
                <NavSection>
                    {bottomRoutes.map(route => (
                        <NavItem
                            key={route.title}
                            $opened={isOpened}
                            $active={activePath === route.path}
                            onClick={() => goToRoute(route.path)}
                        >
                            <FontAwesomeIcon icon={route.icon} />
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                </NavSection>

            </div>
        </SidebarContainer>
    );
};



export default Sidebar;